import { handleLogout } from "@/auth/helper";
import { useUserContext } from "@/context";
import { createMutation } from "react-query-kit";
import apiClient from "../apiClient";

const useDeleteAccount = () => {
  const { updateUser } = useUserContext();
  
  return createMutation(() => apiClient.delete("/me"), {
    onSuccess: async () => {
      await handleLogout(updateUser);
    },
  });
};

export default useDeleteAccount;
