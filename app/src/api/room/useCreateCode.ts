import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

export type CreateCodeData = {
  name: string;
  options: { id?: number; name: string }[];
};

const useCreateCode = createMutation<
  { code: string },
  CreateCodeData
>(async ({ name, options }) =>
  apiClient.post("/code", {
    name,
    options,
  })
);

export default useCreateCode;
