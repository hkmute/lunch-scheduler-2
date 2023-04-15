import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

export type EditCodeData = {
  code: string;
  name: string;
  options: { id?: number; name: string }[];
  allowGuestEdit?: boolean;
};

const useEditCode = createMutation<undefined, EditCodeData>(
  async ({ code, name, options, allowGuestEdit }) =>
    apiClient.put(`/code/${code}`, {
      name,
      options,
      allowGuestEdit,
    })
);

export default useEditCode;
