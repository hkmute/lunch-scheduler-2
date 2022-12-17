import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "react-native";
import HistoryScreen from "../screen/room/HistoryScreen";
import SettingsScreen from "../screen/room/SettingsScreen";
import TodayScreen from "../screen/room/TodayScreen";
import { RoomTabParamList, RootStackParamList } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "Room">;

const Tab = createBottomTabNavigator<RoomTabParamList>();

const RoomTabNavigator: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => navigation.navigate("Home");

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerRight: () => <Button title="退出房間" onPress={handleBack} />,
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default RoomTabNavigator;
