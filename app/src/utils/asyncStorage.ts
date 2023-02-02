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
