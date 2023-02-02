import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

export type MutateVoteData = {
  code: string;
  todayOptionId: number;
  voter: string;
};

const useMutateVote = createMutation<undefined, MutateVoteData>(
  async ({ code, todayOptionId, voter }) =>
    apiClient.post(`/vote`, {
      code,
      todayOptionId,
      voter,
    })
);

export default useMutateVote;
