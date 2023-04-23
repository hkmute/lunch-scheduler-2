import { useCodeContext } from "@/context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, useTheme } from "@rneui/themed";
import HistoryScreen from "../screen/room/HistoryScreen";
import SettingsScreen from "../screen/room/SettingsScreen";
import TodayScreen from "../screen/room/TodayScreen";
import { RoomTabParamList, RootStackParamList } from "./types";
import { MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import GuideButton from "@/components/GuideButton";
import { useEffect } from "react";
import updatePushTokenCode from "@/api/notification/updatePushTokenCode";
import { asyncGetPushToken } from "@/utils/asyncStorage";

type Props = NativeStackScreenProps<RootStackParamList, "Room">;

const Tab = createBottomTabNavigator<RoomTabParamList>();

const RoomTabNavigator: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { code, updateCode } = useCodeContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    asyncGetPushToken().then((token) => {
      // if (token) {
        updatePushTokenCode('test-token', code);
      // }
    });
    return () => {
      asyncGetPushToken().then((token) => {
        if (token) {
          updatePushTokenCode(token, undefined);
        }
      });
    }
  }, []);

  const handleBack = async () => {
    await updateCode("");
    queryClient.clear();
    navigation.navigate("Home");
  };

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerLeft: () => <GuideButton />,
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
