import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

export type EditCodeData = {
  code: string;
  name: string;
  options: { id?: number; name: string }[];
};

const useEditCode = createMutation<undefined, EditCodeData>(
  async ({ code, name, options }) =>
    apiClient.put(`/code/${code}`, {
      name,
      options,
    })
);

export default useEditCode;
