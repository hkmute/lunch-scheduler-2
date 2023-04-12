import theme from "@/styles/theme";
import { StyleSheet, View } from "react-native";

const ItemSeparator: React.FC = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    flex: 1,
    height: 1,
    backgroundColor: theme.lightColors?.grey4,
  },
});

export default ItemSeparator;
