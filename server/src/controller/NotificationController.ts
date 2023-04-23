import { RequestHandler } from "express";
import NotificationService from "../service/NotificationService";

class NotificationController {
  constructor(private notificationService: NotificationService) {}

  updatePushToken: RequestHandler = async (req, res) => {
    const userId = req.user;
    const { expoToken } = req.body;
    const token = await this.notificationService.getPushToken(expoToken);
    if (token) {
      await this.notificationService.updatePushTokenUser(expoToken, userId);
    } else {
      await this.notificationService.addPushToken(expoToken, userId);
    }
    return res.json();
  };

  updatePushTokenCode: RequestHandler = async (req, res) => {
    const { expoToken, code } = req.body;
    await this.notificationService.updatePushTokenCode(expoToken, code);
    return res.json();
  };
}

export default NotificationController;
