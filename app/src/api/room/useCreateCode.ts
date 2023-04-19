import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

export type CreateCodeData = {
  name: string;
  options: { id?: number; name: string }[];
  allowGuestEdit: boolean;
  voteHour: number;
  lotteryHour: number;
};

const useCreateCode = createMutation<{ code: string }, CreateCodeData>(
  async ({ name, options, allowGuestEdit, voteHour, lotteryHour }) =>
    apiClient.post("/code", {
      name,
      options,
      allowGuestEdit,
      voteHour,
      lotteryHour,
    })
);

export default useCreateCode;
