import { View, Text } from "react-native";
import { RoomTabScreenProps } from "../../navigation/types";

type Props = RoomTabScreenProps<"Today">;

const TodayScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>TodayScreen</Text>
    </View>
  );
};

export default TodayScreen;
