import { createTheme } from "@rneui/themed";
import appColor from "./colors";

const theme = createTheme({
  lightColors: appColor,
  darkColors: appColor,
  components: {
    Text: (props, theme) => ({
      style: {
        color: theme.colors.grey0,
      },
    }),
    Button: (props, theme) => ({
      buttonStyle: {
        borderRadius: props.size === "sm" ? 12 : 16,
        borderWidth: props.type === "outline" ? 1 : 0,
      },
      titleStyle: {
        fontSize: props.size === "sm" ? 14 : 18,
      },
    }),
    Input: (props, theme) => ({
      inputContainerStyle: {
        borderBottomWidth: 0,
      },
      inputStyle: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: theme.colors.grey4,
        color: theme.colors.grey0,
      },
      labelStyle: {
        color: theme.colors.grey1,
        marginBottom: 4,
        marginLeft: 6,
      },
    }),
    CheckBox: (props, theme) => ({
      iconType: "material",
      checkedIcon: "check-box",
      uncheckedIcon: "check-box-outline-blank",
      checkedColor: theme.colors.primary,
      containerStyle: {
        backgroundColor: "transparent",
        borderWidth: 0,
        padding: 0,
        margin: 0,
      },
      textStyle: {
        color: theme.colors.grey1,
        fontSize: 16,
      },
    }),
  },
});

export default theme;
