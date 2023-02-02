import theme from "@/styles/theme";
import Toast from "react-native-root-toast";

export const showToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
    backgroundColor: theme.lightColors?.primary,
    shadow: false,
    animation: true,
    hideOnPress: false,
    delay: 0,
  });
};
