import updatePushToken from "@/api/notification/updatePushToken";
import appColor from "@/styles/colors";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: appColor.primary,
      });
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("token", token);
    return token;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};

const useNotification = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        await updatePushToken(token);
      }
      setIsReady(true);
    });
  }, []);

  return { isReady };
};

export default useNotification;
