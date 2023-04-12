import useMutateVote from "@/api/room/useMutateVote";
import useToday from "@/api/room/useToday";
import { useCodeContext, useUserContext } from "@/context";
import fonts from "@/styles/fonts";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoomTabScreenProps } from "../../navigation/types";

type Props = RoomTabScreenProps<"Today">;

const TodayScreen: React.FC<Props> = () => {
  const { code } = useCodeContext();
  const { deviceId } = useUserContext();
  const { data, refetch } = useToday({ variables: { code } });
  const { mutate } = useMutateVote({ onSuccess: refetch });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const handlePress = (todayOptionId: number) => () => {
    mutate({ code, todayOptionId, voter: deviceId });
  };

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>投票時段將於早上8:00開始</Text>
      </View>
    );
  }

  if (Array.isArray(data)) {
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>投票時段</Text>
        <Text style={styles.bodyText}>(8:00 - 11:00)</Text>
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
