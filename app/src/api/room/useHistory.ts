import { AppErrorResponse } from "@/types";
import { createInfiniteQuery } from "react-query-kit";
import apiClient from "../apiClient";

type HistoryRes = {
  data: historyItem[];
  limit: number;
  offset: number;
  totalCount: number;
};

export type historyItem = {
  id: number;
  date: string;
  option: {
    id: number;
    name: string;
  };
};

type HistoryVar = {
  code: string;
  limit?: number;
  offset?: number;
};

export const USE_HISTORY_KEY = "history";

const useHistory = createInfiniteQuery<
  HistoryRes,
  HistoryVar,
  AppErrorResponse
>({
  primaryKey: USE_HISTORY_KEY,
  queryFn: ({ queryKey: [primaryKey, { code, ...params }], pageParam }) => {
    return apiClient.get(`/history/${code}`, { params: pageParam ?? params });
  },
  getNextPageParam: (lastPage, pages) => {
    if (lastPage.offset + lastPage.limit < lastPage.totalCount) {
      return {
        offset: lastPage.offset + lastPage.limit,
        limit: lastPage.limit,
      };
    }
  },
  enabled: (data, variables) => !!variables.code,
});

export default useHistory;
