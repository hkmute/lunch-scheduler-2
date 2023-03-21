import LoginButtons from "@/components/LoginButtons";
import fonts from "@/styles/fonts";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "@rneui/themed";
import useCreateCode from "@/api/room/useCreateCode";
import { RootStackParamList } from "@/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCodeContext, useUserContext } from "@/context";
import RoomForm from "@/components/forms/RoomForm";
import updateRoomHistory from "@/utils/updateRoomHistory";

type Props = NativeStackScreenProps<RootStackParamList, "CreateRoom">;

const CreateRoomScreen: React.FC<Props> = ({ navigation }) => {
  const user = useUserContext();
  const { updateCode } = useCodeContext();
  const { mutate, isLoading } = useCreateCode({
    onSuccess: async (data, variables) => {
      const code = data?.code;
      if (code) {
        await updateCode(code);
        navigation.navigate("Room", { screen: "Today" });
        await updateRoomHistory({
          code,
          optionListName: variables.name,
        });
      }
    },
  });

  if (!user.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>請登入或註冊</Text>
        <LoginButtons />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <RoomForm mutate={mutate} isLoading={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loginText: {
    ...fonts.title,
    textAlign: "center",
  },
});

export default CreateRoomScreen;
