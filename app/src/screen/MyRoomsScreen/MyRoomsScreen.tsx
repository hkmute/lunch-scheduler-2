import LoginOrRegister from "@/components/LoginOrRegister";
import { useUserContext } from "@/context";
import { RootStackParamList } from "@/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MyRoomList from "./components/MyRoomList";

type Props = NativeStackScreenProps<RootStackParamList, "MyRooms">;

const MyRoomsScreen: React.FC<Props> = () => {
  const user = useUserContext();

  if (!user.id) {
    return <LoginOrRegister />;
  }
  return <MyRoomList />;
};

export default MyRoomsScreen;
