import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, useTheme } from "@rneui/themed";
import HistoryScreen from "../screen/room/HistoryScreen";
import SettingsScreen from "../screen/room/SettingsScreen";
import TodayScreen from "../screen/room/TodayScreen";
import { RoomTabParamList, RootStackParamList } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "Room">;

const Tab = createBottomTabNavigator<RoomTabParamList>();

const RoomTabNavigator: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const handleBack = () => navigation.navigate("Home");

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerRight: () => <Button title="退出團隊" onPress={handleBack} />,
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default RoomTabNavigator;
