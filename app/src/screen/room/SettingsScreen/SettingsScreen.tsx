import * as Application from "expo-application";
import * as Updates from "expo-updates";
import useCodeSettings from "@/api/room/useCodeSettings";
import LoginButtons from "@/components/LoginButtons";
import LogoutButton from "@/components/LogoutButton";
import { useCodeContext, useUserContext } from "@/context";
import appColor from "@/styles/colors";
import fonts from "@/styles/fonts";
import { useEffect } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { RoomTabScreenProps } from "../../../navigation/types";
import GuestOptionList from "./components/GuestOptionList";
import OwnerOptionList from "./components/OwnerOptionList";
import VersionText from "@/components/viewComponents/VersionText";

type Props = RoomTabScreenProps<"Settings">;

const SettingsScreen: React.FC<Props> = () => {
  const { code } = useCodeContext();
  const user = useUserContext();
  const { data, refetch } = useCodeSettings({ variables: { code } });

  useEffect(() => {
    refetch();
  }, [user]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {!user.id && <LoginButtons />}
      {!!user.id && (
        <View style={styles.userRow}>
          <Text style={styles.userText}>{user.displayName}</Text>
          <LogoutButton />
        </View>
      )}
      {data && data.isOwner && (
        <OwnerOptionList code={data.code} optionList={data.optionList} />
      )}
      {data && !data.isOwner && (
        <GuestOptionList code={data.code} optionList={data.optionList} />
      )}
      <VersionText />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  userRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  userText: {
    ...fonts.title,
    color: appColor?.grey0,
    marginRight: 16,
  },
});

export default SettingsScreen;
