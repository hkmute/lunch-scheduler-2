import { ThemeProvider } from "@rneui/themed";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import queryClient from "./api/queryClient";
import { UserContextProvider } from "./context/UserContext";
import { ErrorContextProvider } from "./context/ErrorContext";
import RootStackNavigator from "./navigation";
import theme from "./styles/theme";
import ErrorModal from "./components/viewComponents/ErrorModal";
import NavContainer from "./navigation/NavContainer";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <QueryClientProvider client={queryClient}>
            <ErrorContextProvider>
              <UserContextProvider>
                <NavContainer>
                  <StatusBar style="light" />
                  <ErrorModal />
                  <RootStackNavigator />
                </NavContainer>
              </UserContextProvider>
            </ErrorContextProvider>
          </QueryClientProvider>
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
