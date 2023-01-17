import { ErrorContext } from "@/context/ErrorContext";
import { Button, Dialog } from "@rneui/themed";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import fonts from "@/styles/fonts";

const ErrorModal: React.FC = () => {
  const error = useContext(ErrorContext);

  const handleClose = () => {
    error.updateError({ message: "" });
  };

  return (
    <Dialog
      isVisible={!!error.message}
      onBackdropPress={handleClose}
      overlayStyle={styles.container}
    >
      <Text style={styles.errorText}>{error.message}</Text>
      <Button title="確定" onPress={handleClose} />
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  errorText: {
    ...fonts.title,
    marginBottom: 16,
    textAlign: "center",
  },
});

export default ErrorModal;
