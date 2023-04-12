import useEditCode from "@/api/room/useEditCode";
import RoomForm from "@/components/forms/RoomForm";
import { showToast } from "@/utils/toast";
import updateRoomHistory from "@/utils/updateRoomHistory";
import { View } from "react-native";
import CodeRow from "./CodeRow";

type Props = {
  code: string;
  optionList: {
    id: number;
    name: string;
    options: { id: number; name: string }[];
  };
};

const OwnerOptionList: React.FC<Props> = ({ code, optionList }) => {
  const { mutate, isLoading } = useEditCode({
    onSuccess: async (data, variables) => {
      showToast("修改成功");
      await updateRoomHistory({
        code,
        optionListName: variables.name,
      });
    },
  });

  return (
    <View>
      <CodeRow code={code} />
      <RoomForm
        mutate={mutate}
        isLoading={isLoading}
        defaultValues={optionList}
      />
    </View>
  );
};

export default OwnerOptionList;
