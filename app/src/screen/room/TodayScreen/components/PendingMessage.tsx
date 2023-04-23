import useCodeSettings from "@/api/room/useCodeSettings";
import { useCodeContext } from "@/context";
import fonts from "@/styles/fonts";
import { StyleSheet, View, Text } from "react-native";

const PendingMessage: React.FC = () => {
  const { code } = useCodeContext();
  const { data, isLoading } = useCodeSettings({ variables: { code } });

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>投票時段將於{data?.voteHour}:00開始</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  bodyText: {
    ...fonts.body,
    textAlign: "center",
  },
});

export default PendingMessage;
