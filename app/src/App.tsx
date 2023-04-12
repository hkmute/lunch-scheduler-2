import { ThemeProvider } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContextProvider } from "./context/UserContext";
import { ErrorContextProvider } from "./context/ErrorContext";
import RootStackNavigator from "./navigation";
import theme from "./styles/theme";
import ErrorModal from "./components/viewComponents/ErrorModal";
import NavContainer from "./navigation/NavContainer";
import { CodeContextProvider } from "./context/CodeContext";
import QueryClientProvider from "./api/QueryClientProvider";
import { RootSiblingParent } from "react-native-root-siblings";
import { sentryInit } from "./utils/sentry";
import SplashScreenManager from "./components/SplashScreenManager";

sentryInit();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <View style={styles.container}>
            <ErrorContextProvider>
              <QueryClientProvider>
                <UserContextProvider>
                  <CodeContextProvider>
                    <NavContainer>
                      <SplashScreenManager />
                      <StatusBar style="light" />
                      <ErrorModal />
                      <RootStackNavigator />
                    </NavContainer>
                  </CodeContextProvider>
                </UserContextProvider>
              </QueryClientProvider>
            </ErrorContextProvider>
          </View>
        </RootSiblingParent>
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
