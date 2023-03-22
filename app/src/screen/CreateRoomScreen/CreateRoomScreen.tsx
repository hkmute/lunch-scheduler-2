import LoginButtons from "@/components/LoginButtons";
import fonts from "@/styles/fonts";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
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
      <View style={[styles.container, styles.scrollContainer]}>
        <Text style={styles.loginText}>請登入或註冊</Text>
        <LoginButtons />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <RoomForm mutate={mutate} isLoading={isLoading} />
      </ScrollView>
    </KeyboardAvoidingView>
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

export default CreateRoomScreen;
