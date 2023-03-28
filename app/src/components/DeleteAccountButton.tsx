import useDeleteAccount from "@/api/auth/useDeleteAccount";
import appColor from "@/styles/colors";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  containerStyle?: ViewStyle;
};

const DeleteAccountButton: React.FC<Props> = ({ containerStyle }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate } = useDeleteAccount()();

  const handleDeleteAccount = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }
    await mutate();
  };

  return (
    <View style={containerStyle}>
      {showConfirm ? (
        <Button type="solid" color="error" onPress={handleDeleteAccount}>
          確定刪除帳號？
        </Button>
      ) : (
        <Button
          type="clear"
          color="error"
          titleStyle={styles.deleteAccountText}
          onPress={handleDeleteAccount}
        >
          刪除帳號
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deleteAccountText: {
    color: appColor.grey2,
  },
});

export default DeleteAccountButton;
