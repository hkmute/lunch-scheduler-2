import { AppErrorResponse, AppSuccessResponse } from "@/types";
import { createQuery } from "react-query-kit";
import apiClient from "../apiClient";

type CodeExistRes = {
  isExist: boolean;
};

type CodeExistVar = {
  code: string;
};

const useCodeExist = createQuery<
  AppSuccessResponse<CodeExistRes>,
  CodeExistVar,
  AppErrorResponse
>("code-exist", ({ queryKey: [primaryKey, variables] }) => {
  return apiClient.get(`/code/${variables.code}/exist`);
});

export default useCodeExist;
