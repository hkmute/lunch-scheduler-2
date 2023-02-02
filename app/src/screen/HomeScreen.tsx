import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Button, useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/viewComponents/TextInput";
import useCodeExist from "@/api/room/useCodeExist";
import { useUpdateError } from "@/context/ErrorContext";
import { useCodeContext } from "@/context";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { code, updateCode } = useCodeContext();
  const updateError = useUpdateError();
  const inputRef = useRef();
  const [codeInput, setCodeInput] = useState("");

  useEffect(() => {
    if (code) {
      navigation.navigate("Room", { screen: "Today" });
    }
  }, [code]);

  const { data, refetch, isFetching } = useCodeExist({
    variables: {
      code: codeInput,
    },
    enabled: false,
  });

  const handleNavigateToRoom = async () => {
    if (!codeInput) {
      return inputRef.current?.shake();
    }

    const result = await refetch();
    if (result.data?.isExist) {
      await updateCode(codeInput);
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
        value={codeInput}
        onChangeText={setCodeInput}
      />
      <Button
        style={styles.buttonWrapper}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        title="加入團隊"
        color="secondary"
        onPress={handleNavigateToRoom}
        loading={isFetching}
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
