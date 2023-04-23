import { asyncSetPushToken } from "@/utils/asyncStorage";
import apiClient from "../apiClient";

const updatePushToken = async (token: string) => {
  try {
    await apiClient.post("/notification/token", {
      expoToken: token,
    });
    await asyncSetPushToken(token);
  } catch (err) {
    console.error(err);
  }
};

export default updatePushToken;
