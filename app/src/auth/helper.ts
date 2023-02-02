import apiClient from "@/api/apiClient";
import { defaultUser, User } from "@/context/UserContext";
import * as SecureStore from "expo-secure-store";

export const handleLoginSuccess = async (
  user: User,
  updateUser: (user: User) => void
) => {
  await SecureStore.setItemAsync("token", user.token);
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  updateUser(user);
};

export const handleLogout = async (updateUser: (user: User) => void) => {
  await SecureStore.setItemAsync("token", "");
  delete apiClient.defaults.headers.common["Authorization"];
  updateUser(defaultUser);
};
