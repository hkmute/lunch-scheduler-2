import { handleLogout } from "@/auth/helper";
import { useUserContext } from "@/context";
import { Button, ButtonProps } from "@rneui/themed";
import { View, ViewStyle } from "react-native";

type Props = {
  containerStyle?: ViewStyle;
  size?: ButtonProps["size"];
};

const LogoutButton: React.FC<Props> = ({ containerStyle, size }) => {
  const { updateUser } = useUserContext();
  const onPress = async () => {
    await handleLogout(updateUser);
  };

  return (
    <Button
      title="登出"
      size={size}
      color="secondary"
      containerStyle={containerStyle}
      onPress={onPress}
    />
  );
};

export default LogoutButton;
