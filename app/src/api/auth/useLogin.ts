import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";
import { AppErrorResponse } from "@/types";
import { User } from "@/context/UserContext";
import { handleLoginSuccess } from "@/auth/helper";

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
  createMutation<LoginResponse, LoginData, AppErrorResponse<string>>(
    ({ type, id_token, displayName }) =>
      apiClient.post("/login", {
        type,
        id_token,
        displayName,
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
