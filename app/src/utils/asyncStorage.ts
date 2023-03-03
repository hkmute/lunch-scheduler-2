import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const asyncSetCode = async (code: string) => {
  return await AsyncStorage.setItem("code", code);
};

export const asyncGetCode = async () => {
  return await AsyncStorage.getItem("code");
};

export const asyncSetDeviceId = async (deviceId: string) => {
  return await SecureStore.setItemAsync("deviceId", deviceId);
};

export const asyncGetDeviceId = async () => {
  return await SecureStore.getItemAsync("deviceId");
};

export const asyncSetRoomHistory = async (
  roomHistory: { code: string; optionListName: string }[]
) => {
  return await SecureStore.setItemAsync(
    "room-history",
    JSON.stringify(roomHistory)
  );
};

export const asyncGetRoomHistory = async (): Promise<
  {
    code: string;
    optionListName: string;
  }[]
> => {
  const roomHistory = await SecureStore.getItemAsync("room-history");
  return roomHistory ? JSON.parse(roomHistory) : [];
};
