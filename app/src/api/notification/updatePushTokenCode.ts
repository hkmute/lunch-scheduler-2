import apiClient from "../apiClient";

const updatePushTokenCode = async (token: string, code: string | undefined) => {
  try {
    await apiClient.put("/notification/token/code", {
      expoToken: token,
      code,
    });
  } catch (err) {
    console.error(err);
  }
};

export default updatePushTokenCode;
