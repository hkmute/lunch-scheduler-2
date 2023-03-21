import useHistory, {
  historyItem,
  USE_HISTORY_KEY,
} from "@/api/room/useHistory";
import ItemSeparator from "@/components/viewComponents/ItemSeparator";
import { useCodeContext } from "@/context";
import fonts from "@/styles/fonts";
import theme from "@/styles/theme";
import { formatDate } from "@/utils/dateHelper";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { RoomTabScreenProps } from "../../navigation/types";

type Props = RoomTabScreenProps<"History">;

const LIMIT = 20;

const HistoryScreen: React.FC<Props> = () => {
  const queryClient = useQueryClient();
  const { code } = useCodeContext();
  const { data, refetch, fetchNextPage, isFetching, hasNextPage } = useHistory({
    variables: { code, limit: LIMIT },
  });

  const dataList = useMemo(() => {
    return data?.pages.reduce<historyItem[]>(
      (acc, cur) => [...acc, ...cur.data],
      []
    );
  }, [data]);

  const renderItem: ListRenderItem<historyItem> = ({ item, index }) => (
    <View key={`${item.id}-${index}`} style={styles.item}>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
      <Text style={styles.name}>{item.option.name}</Text>
    </View>
  );

  const handleEndReach = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const handleRefetch = () => {
    queryClient.setQueriesData(
      { queryKey: [USE_HISTORY_KEY], active: true },
      (data) => {
        return {
          pages: data?.pages.slice(0, 1) ?? [],
          pageParams: data?.pageParams.slice(0, 1) ?? [],
        };
      }
    );
    refetch();
  };

  return (
    <FlatList
      data={dataList}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      onRefresh={handleRefetch}
      refreshing={isFetching}
      onEndReached={handleEndReach}
      initialNumToRender={LIMIT}
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
