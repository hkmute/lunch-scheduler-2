import { AppErrorResponse } from "@/types";
import { createQuery } from "react-query-kit";
import apiClient from "../apiClient";

type CodeExistRes = {
  isExist: boolean;
  optionListName: string;
};

type CodeExistVar = {
  code: string;
};

const useCodeExist = createQuery<CodeExistRes, CodeExistVar, AppErrorResponse>(
  {
    primaryKey: "code-exist",
    queryFn: ({ queryKey: [primaryKey, variables] }) => {
      return apiClient.get(`/code/${variables.code}/exist`);
    },
  }
);

export default useCodeExist;
