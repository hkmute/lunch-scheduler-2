import AppleAuth from "@/auth/AppleAuth";
import GoogleAuth from "@/auth/GoogleAuth";
import { StyleSheet, View } from "react-native";

const LoginButtons = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.button]}>
        <GoogleAuth />
      </View>
      <View style={[styles.button]}>
        <AppleAuth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    gap: 10,
  },
  button: {
    marginBottom: 8,
  },
});

export default LoginButtons;
