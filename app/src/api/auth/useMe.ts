import { createQuery } from "react-query-kit";
import apiClient from "../apiClient";
import * as SecureStore from "expo-secure-store";
import { AppErrorResponse, AppSuccessResponse } from "@/types";
import { User } from "@/context/UserContext";

interface MeResponse {
  id: number;
  displayName: string;
  username: string;
  email: string | null;
  token: string;
}

const useMe = (updateUser: (user: User) => void) =>
  createQuery<
    AppSuccessResponse<MeResponse> | { data: undefined },
    void,
    AppErrorResponse<string>
  >(
    "me",
    async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        return { data: undefined };
      }
      return apiClient.get<
        AppSuccessResponse<MeResponse>,
        AppSuccessResponse<MeResponse>
      >("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      retry: false,
      onSuccess: async (data) => {
        const user = data.data;
        if (user) {
          await SecureStore.setItemAsync("token", user.token);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          updateUser({
            id: user.id,
            displayName: user.displayName,
            token: user.token,
          });
        }
      },
      onError: async () => {
        await SecureStore.deleteItemAsync("token");
        apiClient.defaults.headers.common["Authorization"] = undefined;
      },
    }
  )();

export default useMe;
