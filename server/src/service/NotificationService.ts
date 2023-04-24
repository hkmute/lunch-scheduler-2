import {
  Expo,
  ExpoPushMessage,
  ExpoPushReceipt,
  ExpoPushTicket,
} from "expo-server-sdk";
import { DataSource, Repository } from "typeorm";
import PushToken from "../db/entity/PushToken";
import { newEntity } from "../util/helpers";

class NotificationService {
  private expo: Expo;
  private pushTokenRepo: Repository<PushToken>;

  constructor(dataSource: DataSource) {
    this.expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    this.pushTokenRepo = dataSource.getRepository(PushToken);
  }

  getPushToken = async (expoToken: string) => {
    const pushToken = await this.pushTokenRepo.findOne({
      where: { expoToken },
    });
    return pushToken;
  };

  getPushTokensByCodes = async (codes: string[]) => {
    if (!codes.length) {
      return [];
    }
    const pushTokens = await this.pushTokenRepo
      .createQueryBuilder("push_token")
      .select("array_agg(push_token.expo_token)", "tokens")
      .addSelect("code.code", "code")
      .leftJoin("code", "code", "code.id = push_token.code_id")
      .groupBy("code.code")
      .where("code.code IN (:...codes)", { codes })
      .getRawMany<{
        code: string;
        tokens: string[];
      }>();
    return pushTokens;
  };

  addPushToken = async (expoToken: string, userId?: number) => {
    const pushTokenEntity = newEntity(PushToken, {
      expoToken,
      user: { id: userId },
    });
    const result = await this.pushTokenRepo.save(pushTokenEntity);
    return result;
  };

  updatePushTokenUser = async (
    expoToken: string,
    userId: number | undefined
  ) => {
    const result = await this.pushTokenRepo.update(
      { expoToken },
      { user: { id: userId } }
    );
    return result.affected;
  };

  updatePushTokenCode = async (expoToken: string, code: string | undefined) => {
    const result = await this.pushTokenRepo
      .createQueryBuilder()
      .update("push_token")
      .set({ code: () => '(SELECT id FROM "code" WHERE code.code = :code)' })
      .setParameter("code", code)
      .where({ expoToken })
      .execute();
    return result;
  };

  removePushToken = async (expoToken: string) => {
    const result = await this.pushTokenRepo.delete({ expoToken });
    return result.affected;
  };

  sendNotifications = async (messages: ExpoPushMessage[]) => {
    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets = [];
    for (let chunk of chunks) {
      let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors

      ticketChunk.forEach((ticket) => {
        if (
          ticket.status === "error" &&
          ticket.details?.error === "DeviceNotRegistered" &&
          ticket.details?.expoPushToken
        ) {
          this.removePushToken(ticket.details?.expoPushToken);
        } else {
          // TODO: save receipt id for later use ticketChunk[0].id;
        }
      });
    }
  };

  handleReceipts = async (tickets: ExpoPushTicket[]) => {
    const receiptIds = [];
    for (let ticket of tickets) {
      if (ticket.status === "ok") {
        receiptIds.push(ticket.id);
      } else if (ticket.status === "error") {
        console.error(
          `There was an error (${ticket.details?.error}) sending a notification: ${ticket.message}`
        );
      }
    }

    const chunks = this.expo.chunkPushNotificationReceiptIds(receiptIds);
    let receipts: { [id: string]: ExpoPushReceipt } = {};
    for (let chunk of chunks) {
      const receiptChunk = await this.expo.getPushNotificationReceiptsAsync(
        chunk
      );
      receipts = { ...receipts, ...receiptChunk };
    }

    console.log("receipts", receipts);
    return receipts;
  };
}

export default NotificationService;
