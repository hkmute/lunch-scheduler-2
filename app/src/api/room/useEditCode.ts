import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

export type EditCodeData = {
  code: string;
  name: string;
  options: { id?: number; name: string }[];
  allowGuestEdit?: boolean;
  voteHour: number;
  lotteryHour: number;
};

const useEditCode = createMutation<undefined, EditCodeData>(
  async ({ code, name, options, allowGuestEdit, voteHour, lotteryHour }) =>
    apiClient.put(`/code/${code}`, {
      name,
      options,
      allowGuestEdit,
      voteHour,
      lotteryHour,
    })
);

export default useEditCode;
