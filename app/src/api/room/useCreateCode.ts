import { AppSuccessResponse } from "@/types";
import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

type CreateCodeData = {
  name: string;
  options: { id?: number; name: string }[];
};

const useCreateCode = createMutation<
  AppSuccessResponse<{ code: string }>,
  CreateCodeData
>(async ({ name, options }) =>
  apiClient.post("/code", {
    name,
    options,
  })
);

export default useCreateCode;
