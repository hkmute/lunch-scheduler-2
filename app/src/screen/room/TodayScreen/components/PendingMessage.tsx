import fonts from "@/styles/fonts";
import { StyleSheet, View, Text } from "react-native";

type Props = {
  voteHour?: number;
};

const PendingMessage: React.FC<Props> = ({ voteHour }) => {
  if (!voteHour) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>投票時段將於{voteHour}:00開始</Text>
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
