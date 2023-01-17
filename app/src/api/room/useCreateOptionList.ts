import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

type CreateOptionListData = {
  name: string;
  options: { id?: number; name: string }[];
};

const useCreateOptionList = createMutation(
  async ({ name, options }: CreateOptionListData) =>
    apiClient.post("/option-list", {
      name,
      options,
    })
);

export default useCreateOptionList;
