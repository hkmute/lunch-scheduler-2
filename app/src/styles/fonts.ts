import { StyleSheet } from "react-native";
import theme from "./theme";

const fonts = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  body: {
    fontSize: 16,
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
