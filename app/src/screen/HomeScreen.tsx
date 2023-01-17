import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Button, useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRef, useState } from "react";
import TextInput from "@/components/viewComponents/TextInput";
import useCodeExist from "@/api/room/useCodeExist";
import { useUpdateError } from "@/context/ErrorContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const updateError = useUpdateError();
  const inputRef = useRef();
  const [code, setCode] = useState("");

  const { data, refetch } = useCodeExist({
    variables: {
      code,
    },
    enabled: false,
  });

  const handleNavigateToRoom = async () => {
    if (!code) {
      return inputRef.current?.shake();
    }

    const result = await refetch();
    if (result.data?.data?.isExist) {
      return navigation.navigate("Room", { screen: "Today" });
    } else {
      updateError({ message: "沒有這個團隊" });
    }
  };

  const handleNavigateToCreate = () => navigation.navigate("CreateRoom");

  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: theme.colors.primary }]}
    >
      <TextInput
        ref={inputRef}
        placeholder="輸入團隊編號"
        value={code}
        onChangeText={setCode}
      />
      <Button
        style={styles.buttonWrapper}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        title="加入團隊"
        color="secondary"
        onPress={handleNavigateToRoom}
        // loading
      />
      <Button
        style={styles.buttonWrapper}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        title="建立團隊"
        color="secondary"
        onPress={handleNavigateToCreate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  buttonWrapper: {
    marginBottom: 60,
    marginHorizontal: 8,
  },
  button: {
    padding: 40,
  },
  buttonTitle: {
    fontWeight: "600",
  },
});

export default HomeScreen;
