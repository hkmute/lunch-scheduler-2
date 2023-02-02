import appColor from "@/styles/colors";
import fonts from "@/styles/fonts";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import * as Clipboard from "expo-clipboard";
import { showToast } from "@/utils/toast";

type Props = {
  code: string;
};

const CodeRow: React.FC<Props> = ({ code }) => {
  const { theme } = useTheme();

  const copyCode = async () => {
    await Clipboard.setStringAsync(code);
    showToast("複製成功");
  };
  return (
    <View style={styles.codeRow}>
      <Text style={fonts.label}>團隊編號</Text>
      <Pressable style={styles.codeContainer} onPress={copyCode}>
        <Text style={styles.code}>{code}</Text>
        <MaterialIcons
          name="content-copy"
          size={20}
          color={theme.colors.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  codeRow: {
    marginVertical: 16,
  },
  codeContainer: {
    backgroundColor: appColor.grey4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  code: {
    ...fonts.body,
    padding: 12,
    color: appColor.secondary,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default CodeRow;
