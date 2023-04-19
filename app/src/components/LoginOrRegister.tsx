import { View, Text, StyleSheet } from "react-native";
import LoginButtons from "./LoginButtons";
import fonts from "@/styles/fonts";

const LoginOrRegister: React.FC = () => {
  return (
    <View style={[styles.container, styles.scrollContainer]}>
      <Text style={styles.loginText}>請登入或註冊</Text>
      <LoginButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  loginText: {
    ...fonts.title,
    textAlign: "center",
  },
});

export default LoginOrRegister;
