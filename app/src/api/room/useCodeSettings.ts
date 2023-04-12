import { AppErrorResponse } from "@/types";
import { createQuery } from "react-query-kit";
import apiClient from "../apiClient";

type CodeSettings = {
  id: number;
  code: string;
  isOwner: boolean;
  optionList: {
    id: number;
    name: string;
    options: { id: number; name: string }[];
  };
};

type CodeSettingsVar = {
  code: string;
};

const useCodeSettings = createQuery<
  CodeSettings,
  CodeSettingsVar,
  AppErrorResponse
>(
  "code-settings",
  ({ queryKey: [primaryKey, variables] }) => {
    return apiClient.get(`/code/${variables.code}`);
  },
  {
    enabled: (data, variables) => !!variables.code,
  }
);

export default useCodeSettings;
