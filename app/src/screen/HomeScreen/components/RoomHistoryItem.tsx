import useCodeExist from "@/api/room/useCodeExist";
import fonts from "@/styles/fonts";
import theme from "@/styles/theme";
import { Pressable, StyleSheet, View, Text } from "react-native";

type Props = {
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
      style={[styles.historyItem, styles.divider]}
      onPress={handleNavigateToRoom(roomHistoryItem.code, refetch)}
    >
      <Text style={styles.historyText}>
        {roomHistoryItem.optionListName}
        <Text style={styles.historyCode}> ({roomHistoryItem.code})</Text>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  historyWrapper: {
    paddingHorizontal: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
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
});

export default RoomHistoryItem;
