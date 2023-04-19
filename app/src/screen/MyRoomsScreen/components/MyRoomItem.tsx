import { MyCode } from "@/api/useMyCodes";
import { Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import fonts from "@/styles/fonts";
import appColor from "@/styles/colors";
import { useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useCodeContext } from "@/context";
import updateRoomHistory from "@/utils/updateRoomHistory";

type Props = {
  item: MyCode;
};

const MyRoomItem: React.FC<Props> = ({ item }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { updateCode } = useCodeContext();

  const handlePress = async () => {
    await updateCode(item.code);
    navigate("Room", { screen: "Today" });
    await updateRoomHistory({
      code: item.code,
      optionListName: item.optionList.name,
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.code}>
        {item.optionList.name} ({item.code})
      </Text>
      <Text style={styles.entry}>進入</Text>
      <MaterialIcons name="arrow-right" size={24} color={theme.colors.grey0} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  code: {
    flex: 1,
    ...fonts.light,
  },
  entry: {
    ...fonts.light,
    color: appColor.grey0,
  },
});

export default MyRoomItem;
