import useMutateVote from "@/api/room/useMutateVote";
import useToday from "@/api/room/useToday";
import { useCodeContext, useUserContext } from "@/context";
import fonts from "@/styles/fonts";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoomTabScreenProps } from "../../../navigation/types";
import PendingMessage from "./components/PendingMessage";
import useCodeSettings from "@/api/room/useCodeSettings";

type Props = RoomTabScreenProps<"Today">;

const TodayScreen: React.FC<Props> = () => {
  const { code } = useCodeContext();
  const { deviceId } = useUserContext();
  const { data, refetch, isLoading } = useToday({ variables: { code } });
  const { mutate } = useMutateVote({ onSuccess: refetch });
  const { data: codeSettings, isLoading: isCodeSettingsLoading } =
    useCodeSettings({ variables: { code } });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const handlePress = (todayOptionId: number) => () => {
    mutate({ code, todayOptionId, voter: deviceId });
  };

  if (isLoading || isCodeSettingsLoading) {
    return null;
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <PendingMessage voteHour={codeSettings?.voteHour} />;
  }

  if (Array.isArray(data)) {
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>投票時段</Text>
        <Text style={styles.bodyText}>
          ({codeSettings?.voteHour}:00 - {codeSettings?.lotteryHour}:00)
        </Text>
        {data.map((item) => (
          <View key={item.id} style={styles.buttonWrapper}>
            <Button
              type={
                item.votes?.find(({ voter }) => voter === deviceId)
                  ? "solid"
                  : "outline"
              }
              buttonStyle={styles.button}
              title={item.option.name}
              onPress={handlePress(item.id)}
            />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>今日食</Text>
      <Text style={styles.resultText}>{data.option.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  buttonWrapper: {
    marginBottom: 16,
    marginTop: 12,
  },
  button: {
    borderWidth: 1,
  },
  bodyText: {
    ...fonts.body,
    textAlign: "center",
  },
  resultText: {
    ...fonts.large,
    textAlign: "center",
  },
});

export default TodayScreen;
