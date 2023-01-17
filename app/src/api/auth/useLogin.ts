import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";
import * as SecureStore from "expo-secure-store";
import { AppErrorResponse, AppSuccessResponse } from "@/types";
import { User } from "@/context/UserContext";

interface LoginData {
  type: "google" | "apple";
  id_token: string;
  displayName?: string | null;
}

interface LoginResponse {
  id: number;
  displayName: string;
  token: string;
}

const useLogin = (updateUser: (user: User) => void) =>
  createMutation<
    AppSuccessResponse<LoginResponse>,
    LoginData,
    AppErrorResponse<string>
  >(
    ({ type, id_token, displayName }) =>
      apiClient.post("/login", {
        type,
        id_token,
        displayName,
      }),
    {
      async onSuccess(data, variables, context) {
        const user = data.data;
        if (user?.token) {
          await SecureStore.setItemAsync("token", user.token);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          updateUser(user);
        }
      },
    }
  )();

export default useLogin;
