import useHistory, { historyItem } from "@/api/room/useHistory";
import ItemSeparator from "@/components/viewComponents/ItemSeparator";
import { useCodeContext } from "@/context";
import fonts from "@/styles/fonts";
import theme from "@/styles/theme";
import { formatDate } from "@/utils/dateHelper";
import { useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { RoomTabScreenProps } from "../../navigation/types";

type Props = RoomTabScreenProps<"History">;

const HistoryScreen: React.FC<Props> = () => {
  const { code } = useCodeContext();
  const {
    data,
    refetch,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useHistory({
    variables: { code },
  });

  const dataList = useMemo(
    () =>
      data?.pages.reduce<historyItem[]>(
        (acc, cur) => [...acc, ...cur.data],
        []
      ),
    [data]
  );

  const renderItem: ListRenderItem<historyItem> = ({ item, index }) => (
    <View key={`${item.id}-${index}`} style={styles.item}>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
      <Text style={styles.name}>{item.option.name}</Text>
    </View>
  );

  const handleEndReach = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={dataList}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      onRefresh={refetch}
      refreshing={isFetching}
      onEndReached={handleEndReach}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  date: {
    ...fonts.body,
    color: theme.lightColors?.grey1,
  },
  name: {
    ...fonts.body,
    flex: 1,
    textAlign: "center",
  },
});

export default HistoryScreen;
