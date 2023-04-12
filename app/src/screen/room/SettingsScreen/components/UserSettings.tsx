import appColor from "@/styles/colors";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Animated,
} from "react-native";
import LogoutButton from "@/components/LogoutButton";
import BottomSheet from "@/components/viewComponents/BotttomSheet";
import DeleteAccountButton from "@/components/DeleteAccountButton";

const UserSettings: React.FC = () => {
  const [openBottomSheet, setBottomSheet] = useState(false);

  const handleOpen = () => {
    setBottomSheet(true);
  };

  const handleClose = () => {
    setBottomSheet(false);
  };

  return (
    <>
      <Icon
        onPress={handleOpen}
        type="MaterialIcons"
        name="settings"
        color={appColor.primary}
      />
      <BottomSheet visible={openBottomSheet} handleClose={handleClose}>
        <View style={styles.content}>
          <LogoutButton containerStyle={styles.logoutButton} />
          <DeleteAccountButton />
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
  logoutButton: {
    marginBottom: 8,
  },
});

export default UserSettings;
