import schedule from "node-schedule";
import { DataSource, Repository } from "typeorm";
import Vote from "../db/entity/Vote";
import CodeService from "./CodeService";
import HistoryService from "./HistoryService";
import TodayOptionService from "./TodayOptionService";
import { getHours, startOfDay } from "date-fns";
import { newEntity } from "../util/helpers";

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
        date: startOfDay(new Date()),
      },
    });
    return votes;
  };

  vote = async (code: string, todayOptionId: number, voter: string) => {
    const codeEntity = await this.codeService.getCode(code);
    const newVote = newEntity(Vote, {
      date: startOfDay(new Date()),
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
    schedule.scheduleJob("00 * * * *", async () => {
      const allCode = await this.codeService.getAllCode(); //TODO: hour config for code
      allCode.forEach(({ code }) => {
        const defaultCreateHour = 8;
        if (getHours(new Date()) === defaultCreateHour) {
          this.createVoteCandidates(code);
        }
      });
    });
    console.log("Scheduled to create vote candidates every hour at 0 mins");
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
        console.log(`Create code ${code} history with optionId ${optionId}`);
        this.historyService.createCodeHistory(code, parseInt(optionId));
        return;
      }
    }
  };

  scheduleLottery = async () => {
    schedule.scheduleJob("00 * * * *", async () => {
      const allCode = await this.codeService.getAllCode(); //TODO: hour config for code
      allCode.forEach(({ code }) => {
        const defaultCreateHour = 11;
        if (getHours(new Date()) === defaultCreateHour) {
          this.startLottery(code);
        }
      });
    });
    console.log("Scheduled to create lottery result every hour at 30 mins");
  };
}

export default VoteService;
