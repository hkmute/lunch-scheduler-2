import useMyCodes, { MyCode } from "@/api/useMyCodes";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import MyRoomItem from "./MyRoomItem";
import ItemSeparator from "@/components/viewComponents/ItemSeparator";
import MyRoomEmpty from "./MyRoomEmpty";

const MyRoomList: React.FC = () => {
  const { data } = useMyCodes();

  const renderItem: ListRenderItem<MyCode> = ({ item }) => (
    <MyRoomItem key={item.id} item={item} />
  );

  return (
    <FlatList
      data={[]}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={MyRoomEmpty}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});

export default MyRoomList;
