import { CreateThemeOptions } from "@rneui/themed";
import { common, grey, blueGrey, red } from "./palette";

const primaryColor = blueGrey;
const secondaryColor = blueGrey;

const appColor: NonNullable<CreateThemeOptions["lightColors"]> = {
  primary: primaryColor[700],
  secondary: secondaryColor[500],
  background: grey[200],
  white: common.white,
  black: common.black,
  grey0: grey[800],
  grey1: grey[700],
  grey2: grey[600],
  grey3: grey[400],
  grey4: grey[300],
  grey5: grey[200],
  greyOutline: grey[100],
  searchBg: grey[200],
  // success:
  error: red[900],
  // warning:
  divider: grey[100],
};

export default appColor;
