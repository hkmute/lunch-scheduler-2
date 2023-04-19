import fonts from "@/styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { View, StyleSheet, Text } from "react-native";

const MyRoomEmpty: React.FC = () => {
  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate("CreateRoom");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>未有我的團隊</Text>
      <Button title="立即創建" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    ...fonts.title,
    marginBottom: 8,
  },
});

export default MyRoomEmpty;
