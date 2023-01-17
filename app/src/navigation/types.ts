import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Home: HomeScreenParamList;
  CreateRoom: CreateRoomScreenParamList;
  Room: NavigatorScreenParams<RoomTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeScreenParamList = undefined;
export type CreateRoomScreenParamList = undefined;

export type RoomTabParamList = {
  Today: TodayScreenParamList;
  History: HistoryScreenParamList;
  Settings: SettingsScreenParamList;
};

export type RoomTabScreenProps<T extends keyof RoomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RoomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type TodayScreenParamList = { code: string };
export type HistoryScreenParamList = undefined;
export type SettingsScreenParamList = undefined;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
