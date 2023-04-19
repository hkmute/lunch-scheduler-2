import { AppErrorResponse } from "@/types";
import { createQuery } from "react-query-kit";
import apiClient from "./apiClient";

export type MyCode = {
  id: number;
  code: string;
  allowGuestEdit: boolean;
  lotteryHour: number;
  voteHour: number;
  optionList: {
    id: number;
    name: string;
  };
};

const useMyCodes = createQuery<MyCode[], void, AppErrorResponse>(
  "my-code-list",
  ({ queryKey: [primaryKey] }) => {
    return apiClient.get(`/me/code`);
  }
);

export default useMyCodes;
