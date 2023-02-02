import { AppErrorResponse } from "@/types";
import { createQuery } from "react-query-kit";
import apiClient from "../apiClient";

type TodayRes =
  | {
      id: number;
      date: string;
      option: { id: number; name: string };
      votes: { id: number; date: string; voter: string }[];
    }[]
  | {
      id: number;
      date: string;
      option: { id: number; name: string };
    };

type TodayVar = {
  code: string;
};

const useToday = createQuery<TodayRes, TodayVar, AppErrorResponse>(
  "today",
  ({ queryKey: [primaryKey, variables] }) => {
    return apiClient.get(`/today/${variables.code}`);
  }
);

export default useToday;
