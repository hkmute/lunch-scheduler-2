import appColor from "@/styles/colors";
import fonts from "@/styles/fonts";
import * as Application from "expo-application";
import * as Updates from "expo-updates";
import { Text, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  containerStyle?: ViewStyle;
};

const VersionText: React.FC<Props> = ({ containerStyle }) => {  
  return (
    <View style={containerStyle}>
      <Text style={styles.version}>
        {Application.nativeApplicationVersion}.{Application.nativeBuildVersion}
        {Updates.updateId?.slice(-4) ?? "0000"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  version: {
    ...fonts.small,
    color: appColor?.grey3,
    textAlign: "right",
  },
});

export default VersionText;
