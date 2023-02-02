import useEditCode from "@/api/room/useEditCode";
import RoomForm from "@/components/forms/RoomForm";
import { showToast } from "@/utils/toast";
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
    onSuccess: () => {
      showToast("修改成功");
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
