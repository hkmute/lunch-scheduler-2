import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";
import { AppErrorResponse } from "@/types";
import { User } from "@/context/UserContext";
import { handleLoginSuccess } from "@/auth/helper";

interface LoginData {
  type: "google" | "apple";
  id_token: string;
  authorizationCode: string | null;
  displayName?: string | null;
  isDev?: boolean;
}

interface LoginResponse {
  id: number;
  displayName: string;
  token: string;
}

const useLogin = (updateUser: (user: User) => void) =>
  createMutation<LoginResponse, LoginData, AppErrorResponse<string>>(
    ({ type, id_token, displayName, authorizationCode, isDev }) =>
      apiClient.post("/login", {
        type,
        id_token,
        displayName,
        authorizationCode,
        isDev,
      }),
    {
      async onSuccess(data, variables, context) {
        if (data?.token) {
          await handleLoginSuccess(data, updateUser);
        }
      },
    }
  )();

export default useLogin;
