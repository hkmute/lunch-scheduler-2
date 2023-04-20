import schedule from "node-schedule";
import { DataSource, Repository } from "typeorm";
import Vote from "../db/entity/Vote";
import CodeService from "./CodeService";
import HistoryService from "./HistoryService";
import TodayOptionService from "./TodayOptionService";
import { getStartOfHKTDay, newEntity } from "../util/helpers";

class VoteService {
  private voteRepo: Repository<Vote>;
  constructor(
    dataSource: DataSource,
    private codeService: CodeService,
    private todayOptionService: TodayOptionService,
    private historyService: HistoryService
  ) {
    this.voteRepo = dataSource.getRepository(Vote);
  }

  initCron = () => {
    this.scheduleCreateVoteCandidates();
    this.scheduleLottery();
  };

  getTodayVote = async (code: string) => {
    const votes = await this.voteRepo.find({
      relations: {
        todayOption: {
          option: true,
        },
      },
      where: {
        code: {
          code,
        },
        date: getStartOfHKTDay(),
      },
    });
    return votes;
  };

  vote = async (code: string, todayOptionId: number, voter: string) => {
    const codeEntity = await this.codeService.getCode(code);
    const newVote = newEntity(Vote, {
      date: getStartOfHKTDay(),
      voter,
      code: codeEntity,
      todayOption: todayOptionId,
    });
    await this.voteRepo.upsert(newVote, {
      conflictPaths: {
        date: true,
        voter: true,
        code: true,
      },
      skipUpdateIfNoValuesChanged: true,
    });
    return true;
  };

  createVoteCandidates = async (code: string) => {
    const codeDetails = await this.codeService.getCodeDetails(code);
    if (!codeDetails || !codeDetails.optionList?.options.length) {
      return;
    }
    const result = [];
    const optionsClone = [...codeDetails.optionList.options];
    while (result.length < 3 && optionsClone.length) {
      const selectedIndex = Math.floor(Math.random() * optionsClone.length);
      const selected = optionsClone.splice(selectedIndex, 1)[0];
      result.push(selected);
    }
    await this.todayOptionService.createTodayOptions(code, result);
    return true;
  };

  scheduleCreateVoteCandidates = async () => {
    const scheduleMinute = 1;
    schedule.scheduleJob(`${scheduleMinute} * * * *`, async () => {
      const allCodeToDo =
        await this.codeService.getAllCodeToCreateVoteCandidates();
      console.log("allCodeToDo", allCodeToDo);
      allCodeToDo.forEach(({ code }) => {
        this.createVoteCandidates(code);
      });
    });
    console.log(
      `Scheduled to create vote candidates every hour at ${scheduleMinute} mins`
    );
  };

  startLottery = async (code: string) => {
    console.log(`Started lottery for code ${code}`);
    const todayOptions = await this.todayOptionService.getTodayOptions(code);
    if (!todayOptions.length) {
      return;
    }
    const todayVotes = await this.getTodayVote(code);
    let totalVote = todayOptions.length;

    const votesByOptions = todayVotes.reduce(
      (acc, cur) => {
        if (acc[cur.todayOption?.option.id]) {
          acc[cur.todayOption.option.id] += 1;
          totalVote += 1;
        }
        return acc;
      },
      todayOptions.reduce((acc, cur) => {
        acc[cur.option?.id] = 1;
        return acc;
      }, {} as Record<string, number>)
    );

    let lotteryNumber = Math.random();
    for (const [optionId, prob] of Object.entries(votesByOptions)) {
      lotteryNumber = lotteryNumber - prob / totalVote;
      if (lotteryNumber <= 0) {
        console.log(
          `[${new Date().toISOString()}] Create code ${code} history with optionId ${optionId}`
        );
        this.historyService.createCodeHistory(code, parseInt(optionId));
        return;
      }
    }
  };

  scheduleLottery = async () => {
    const scheduleMinute = 30;
    schedule.scheduleJob(`${scheduleMinute} * * * *`, async () => {
      const allCodeForLottery = await this.codeService.getAllCodeForLottery();
      console.log("allCodeForLottery", allCodeForLottery);
      // TODO: create lottery result in an array and only insert to db once
      allCodeForLottery.forEach(({ code }) => {
        this.startLottery(code);
      });
    });
    console.log(
      `Scheduled to create lottery result every hour at ${scheduleMinute} mins`
    );
  };
}

export default VoteService;
