import { useCodeContext } from "@/context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, useTheme } from "@rneui/themed";
import HistoryScreen from "../screen/room/HistoryScreen";
import SettingsScreen from "../screen/room/SettingsScreen";
import TodayScreen from "../screen/room/TodayScreen";
import { RoomTabParamList, RootStackParamList } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Room">;

const Tab = createBottomTabNavigator<RoomTabParamList>();

const RoomTabNavigator: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateCode } = useCodeContext();

  const handleBack = async () => {
    await updateCode("");
    navigation.navigate("Home");
  };

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerRight: () => <Button title="退出團隊" onPress={handleBack} />,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grey3,
      })}
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          title: "今日",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="today" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "歷史記錄",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "設定",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RoomTabNavigator;
