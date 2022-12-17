import { View, Text } from "react-native";
import { RoomTabScreenProps } from "../../navigation/types";

type Props = RoomTabScreenProps<"History">;

const HistoryScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>HistoryScreen</Text>
    </View>
  );
};

export default HistoryScreen;
