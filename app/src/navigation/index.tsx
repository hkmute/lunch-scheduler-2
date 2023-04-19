import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import CreateRoomScreen from "../screen/CreateRoomScreen";
import HomeScreen from "../screen/HomeScreen";
import RoomTabNavigator from "./RoomTabNavigator";
import { RootStackParamList } from "./types";
import MyRoomsScreen from "@/screen/MyRoomsScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const { theme } = useTheme();

  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerBackTitleVisible: false,
      }}
    >
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="CreateRoom"
        component={CreateRoomScreen}
        options={{ title: "建立團隊" }}
      />
      <RootStack.Screen
        name="MyRooms"
        component={MyRoomsScreen}
        options={{ title: "我的團隊" }}
      />
      <RootStack.Screen
        name="Room"
        component={RoomTabNavigator}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
