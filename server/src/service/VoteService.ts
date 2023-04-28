import schedule from "node-schedule";
import { DataSource, Repository } from "typeorm";
import Vote, { VoteType } from "../db/entity/Vote";
import CodeService from "./CodeService";
import HistoryService from "./HistoryService";
import TodayOptionService from "./TodayOptionService";
import { getStartOfHKTDay, newEntity } from "../util/helpers";
import NotificationService from "./NotificationService";
import { ExpoPushMessage } from "expo-server-sdk";

class VoteService {
  private voteRepo: Repository<Vote>;
  constructor(
    dataSource: DataSource,
    private codeService: CodeService,
    private todayOptionService: TodayOptionService,
    private historyService: HistoryService,
    private notificationService: NotificationService
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

  vote = async (
    code: string,
    todayOptionId: number,
    voter: string,
    type?: VoteType
  ) => {
    const codeEntity = await this.codeService.getCode(code);
    const newVote = newEntity(Vote, {
      date: getStartOfHKTDay(),
      voter,
      code: codeEntity,
      todayOption: todayOptionId,
      type: type || VoteType.UP,
    });
    await this.voteRepo.upsert(newVote, {
      conflictPaths: {
        date: true,
        voter: true,
        code: true,
        type: true,
      },
      skipUpdateIfNoValuesChanged: true,
    });
    return true;
  };

  deleteVote = async (id: string) => {
    await this.voteRepo.delete(id);
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
    return { code, optionsListName: codeDetails.optionList.name, result };
  };

  scheduleCreateVoteCandidates = async () => {
    const scheduleMinute = 1;
    schedule.scheduleJob(`${scheduleMinute} * * * *`, async () => {
      const allCodeToDo =
        await this.codeService.getAllCodeToCreateVoteCandidates();
      console.log("allCodeToDo", allCodeToDo);
      const promises = allCodeToDo.map(({ code }) => {
        return this.createVoteCandidates(code);
      });
      const result = await Promise.allSettled(promises);
      const pushMessages = result.reduce(
        (acc, promiseResult) => {
          if (promiseResult.status === "rejected" || !promiseResult.value) {
            return acc;
          }
          const { code, optionsListName, result } = promiseResult.value;
          console.log("scheduleCreateVoteCandidates promiseResult", result);
          const message: Omit<ExpoPushMessage, "to"> = {
            title: optionsListName,
            body: "開始投票了",
          };
          return {
            codes: [...acc.codes, code],
            messages: { ...acc.messages, [code]: message },
          };
        },
        { codes: [], messages: {} } as {
          codes: string[];
          messages: Record<string, Omit<ExpoPushMessage, "to">>;
        }
      );
      const pushTokens = await this.notificationService.getPushTokensByCodes(
        pushMessages.codes
      );
      const notificationsToSend: ExpoPushMessage[] = pushTokens.map(
        (tokens) => {
          return {
            to: tokens.tokens,
            ...pushMessages.messages[tokens.code],
          };
        }
      );
      await this.notificationService.sendNotifications(notificationsToSend);
      console.log(
        `${new Date()} Created vote candidates and sent notifications`
      );
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
          if (cur.type === VoteType.UP) {
            acc[cur.todayOption.option.id] += 1;
            totalVote += 1;
          } else {
            acc[cur.todayOption.option.id] -= 1;
            totalVote -= 1;
          }
        }
        return acc;
      },
      todayOptions.reduce((acc, cur) => {
        acc[cur.option?.id] = 1;
        return acc;
      }, {} as Record<string, number>)
    );

    Object.entries(votesByOptions).forEach(([optionId, voteNum]) => {
      if (voteNum <= 0) {
        votesByOptions[optionId] = 0;
        totalVote -= voteNum;
      }
    });

    if (totalVote <= 0) {
      Object.entries(votesByOptions).forEach(([optionId, voteNum]) => {
        votesByOptions[optionId] = 1;
      });
      totalVote = todayOptions.length;
    }

    let lotteryNumber = Math.random();
    for (const [optionId, prob] of Object.entries(votesByOptions)) {
      lotteryNumber = lotteryNumber - prob / totalVote;
      if (lotteryNumber <= 0) {
        console.log(
          `[${new Date().toISOString()}] Create code ${code} history with optionId ${optionId}`
        );
        const newHistory = await this.historyService.createCodeHistory(
          code,
          parseInt(optionId)
        );
        if (newHistory) {
          const result = todayOptions.find(
            (option) => option.option?.id === parseInt(optionId)
          );
          return { code, result };
        }
      }
    }
  };

  scheduleLottery = async () => {
    const scheduleMinute = 30;
    schedule.scheduleJob(`${scheduleMinute} * * * *`, async () => {
      const allCodeForLottery = await this.codeService.getAllCodeForLottery();
      console.log("allCodeForLottery", allCodeForLottery);
      // TODO: create lottery result in an array and only insert to db once
      const promises = allCodeForLottery.map(({ code }) => {
        return this.startLottery(code);
      });
      const result = await Promise.allSettled(promises);
      const pushMessages = result.reduce(
        (acc, promiseResult) => {
          if (
            promiseResult.status === "rejected" ||
            !promiseResult.value ||
            !promiseResult.value.result
          ) {
            return acc;
          }
          const { code, result } = promiseResult.value;
          console.log("scheduleLottery promiseResult", result);
          const message: Omit<ExpoPushMessage, "to"> = {
            title: "今日食",
            body: result.option.name,
          };
          return {
            codes: [...acc.codes, code],
            messages: { ...acc.messages, [code]: message },
          };
        },
        { codes: [], messages: {} } as {
          codes: string[];
          messages: Record<string, Omit<ExpoPushMessage, "to">>;
        }
      );
      const pushTokens = await this.notificationService.getPushTokensByCodes(
        pushMessages.codes
      );
      const notificationsToSend: ExpoPushMessage[] = pushTokens.map(
        (tokens) => {
          return {
            to: tokens.tokens,
            ...pushMessages.messages[tokens.code],
          };
        }
      );
      await this.notificationService.sendNotifications(notificationsToSend);
      console.log(
        `${new Date()} Created lottery result and sent notifications`
      );
    });
    console.log(
      `Scheduled to create lottery result every hour at ${scheduleMinute} mins`
    );
  };
}

export default VoteService;
