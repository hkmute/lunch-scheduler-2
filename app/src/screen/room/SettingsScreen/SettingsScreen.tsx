import useCodeSettings from "@/api/room/useCodeSettings";
import LoginButtons from "@/components/LoginButtons";
import { useCodeContext, useUserContext } from "@/context";
import appColor from "@/styles/colors";
import fonts from "@/styles/fonts";
import { useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { RoomTabScreenProps } from "../../../navigation/types";
import GuestOptionList from "./components/GuestOptionList";
import OwnerOptionList from "./components/OwnerOptionList";
import VersionText from "@/components/viewComponents/VersionText";
import UserSettings from "./components/UserSettings";

type Props = RoomTabScreenProps<"Settings">;

const SettingsScreen: React.FC<Props> = () => {
  const { code } = useCodeContext();
  const user = useUserContext();
  const { data, refetch } = useCodeSettings({ variables: { code } });

  useEffect(() => {
    refetch();
  }, [user]);

  const showEditMode = data && (data.isOwner || data.allowGuestEdit);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {!user.id && <LoginButtons />}
        {!!user.id && (
          <View style={styles.userRow}>
            <Text style={styles.userText}>{user.displayName}</Text>
            <UserSettings />
          </View>
        )}
        {data &&
          (showEditMode ? (
            <OwnerOptionList
              code={data.code}
              optionList={data.optionList}
              isOwner={data.isOwner}
              allowGuestEdit={data.allowGuestEdit}
            />
          ) : (
            <GuestOptionList code={data.code} optionList={data.optionList} />
          ))}
        <VersionText />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
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
