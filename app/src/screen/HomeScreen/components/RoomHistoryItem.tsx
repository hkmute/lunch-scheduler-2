import useCodeExist from "@/api/room/useCodeExist";
import fonts from "@/styles/fonts";
import theme from "@/styles/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  index: number;
  roomHistoryItem: {
    code: string;
    optionListName: string;
  };
  handleNavigateToRoom: (
    code: string,
    refetch: Function
  ) => () => Promise<void>;
};

const RoomHistoryItem: React.FC<Props> = ({
  index,
  roomHistoryItem,
  handleNavigateToRoom,
}) => {
  const { data, refetch, isFetching } = useCodeExist({
    variables: {
      code: roomHistoryItem.code,
    },
    enabled: false,
  });

  return (
    <Pressable
      style={[styles.historyItem]}
      onPress={handleNavigateToRoom(roomHistoryItem.code, refetch)}
    >
      <View style={[styles.historyContent, index !== 0 && styles.divider]}>
        <Text style={styles.historyText}>
          {roomHistoryItem.optionListName}
          <Text style={styles.historyCode}> ({roomHistoryItem.code})</Text>
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  historyContent: {
    flex: 1,
    paddingVertical: 8,
  },
  historyText: {
    ...fonts.body,
    color: theme.lightColors?.white,
    marginHorizontal: 8,
  },
  historyCode: {
    ...fonts.small,
    color: theme.lightColors?.grey5,
  },
  divider: {
    borderTopColor: theme.lightColors?.primary,
    borderTopWidth: 1,
  },
});

export default RoomHistoryItem;
