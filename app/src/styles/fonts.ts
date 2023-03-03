import { StyleSheet } from "react-native";
import theme from "./theme";

const fonts = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
    fontWeight: "500",
  },
  large: {
    fontSize: 24,
    fontWeight: "500",
  },
  small: {
    fontSize: 14,
    fontWeight: "500",
  },
  label: {
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "600",
    color: theme.lightColors?.grey1,
  },
});

export default fonts;
