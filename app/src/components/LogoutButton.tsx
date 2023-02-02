import { handleLogout } from "@/auth/helper";
import { useUserContext } from "@/context";
import { Button } from "@rneui/themed";

const LogoutButton: React.FC = () => {
  const { updateUser } = useUserContext();
  const onPress = async () => {
    await handleLogout(updateUser);
  };

  return <Button title="登出" size="sm" color="secondary" onPress={onPress} />;
};

export default LogoutButton;
