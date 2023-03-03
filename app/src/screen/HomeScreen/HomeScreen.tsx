import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { Button, useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import TextInput from "@/components/viewComponents/TextInput";
import useCodeExist from "@/api/room/useCodeExist";
import { useUpdateError } from "@/context/ErrorContext";
import { useCodeContext } from "@/context";
import { asyncGetRoomHistory, asyncSetRoomHistory } from "@/utils/asyncStorage";
import theme from "@/styles/theme";
import fonts from "@/styles/fonts";
import updateRoomHistory from "@/utils/updateRoomHistory";
import RoomHistoryItem from "./components/RoomHistoryItem";
import appIcon from "assets/icon.png";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { code, updateCode } = useCodeContext();
  const updateError = useUpdateError();
  const inputRef = useRef();
  const [codeInput, setCodeInput] = useState("");
  const [roomHistory, setRoomHistory] = useState<
    { code: string; optionListName: string }[]
  >([]);

  useEffect(() => {
    asyncGetRoomHistory().then((data) => {
      setRoomHistory(data);
    });
  }, []);

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

  const handleSubmit = () => {
    if (!codeInput) {
      return inputRef.current?.shake();
    }
    handleNavigateToRoom(codeInput, refetch);
  };

  const handleNavigateToRoom = useCallback(
    (code: string, refetch: Function) => async () => {
      const result = await refetch();
      if (result.data?.isExist) {
        await updateCode(code);
        navigation.navigate("Room", { screen: "Today" });
        const newRoomHistory = await updateRoomHistory({
          code,
          optionListName: result.data.optionListName,
        });
        setRoomHistory(newRoomHistory);
        setCodeInput("");
        return;
      } else {
        updateError({ message: "沒有這個團隊" });
      }
    },
    []
  );

  const handleNavigateToCreate = () => navigation.navigate("CreateRoom");

  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: theme.colors.primary }]}
    >
      <Image source={appIcon} style={styles.icon} />
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
        onPress={handleSubmit}
        loading={isFetching}
      />
      <View style={styles.historyWrapper}>
        {roomHistory.map((history, index) => (
          <RoomHistoryItem
            key={history.code}
            roomHistoryItem={history}
            handleNavigateToRoom={handleNavigateToRoom}
          />
        ))}
      </View>
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
    paddingHorizontal: 60,
    paddingTop: 100,
  },
  icon: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 16,
  },
  historyWrapper: {
    paddingHorizontal: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: theme.lightColors?.secondary,
    borderRadius: 8,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
  },
  historyText: {
    ...fonts.body,
    color: theme.lightColors?.white,
    marginHorizontal: 4,
  },
  historyCode: {
    ...fonts.small,
    color: theme.lightColors?.grey5,
  },
  divider: {
    borderTopColor: theme.lightColors?.primary,
    borderTopWidth: 1,
  },
  buttonWrapper: {
    marginHorizontal: 8,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  buttonTitle: {
    fontWeight: "600",
  },
});

export default HomeScreen;
