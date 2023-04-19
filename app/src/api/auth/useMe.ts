import { createQuery } from "react-query-kit";
import apiClient from "../apiClient";
import * as SecureStore from "expo-secure-store";
import { User } from "@/context/UserContext";

interface MeResponse {
  id: number;
  displayName: string;
  username: string;
  email: string | null;
  token: string;
}

const useMe = (updateUser: (user: User) => void) =>
  createQuery<MeResponse | null, void, string>(
    "me",
    async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        return null;
      }
      return apiClient.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      retry: false,
      onSuccess: async (data) => {
        const user = data;
        if (user) {
          await SecureStore.setItemAsync("token", user.token);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          updateUser({
            id: user.id,
            displayName: user.displayName,
            token: user.token,
          });
        }
      },
      onError: async () => {
        await SecureStore.deleteItemAsync("token");
        apiClient.defaults.headers.common["Authorization"] = undefined;
      },
    }
  )();

export default useMe;
