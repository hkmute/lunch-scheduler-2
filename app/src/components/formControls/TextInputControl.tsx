import { InputProps } from "@rneui/themed";
import {
  Control,
  Controller,
  UseControllerProps,
  useFormState,
} from "react-hook-form";
import TextInput from "../viewComponents/TextInput";

type Props = {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps["rules"];
} & InputProps;

const TextInputControl: React.FC<Props> = ({
  control,
  name,
  rules,
  errorMessage,
  ...rest
}) => {
  const { errors } = useFormState({ control });

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, ...restField } }) => (
        <TextInput
          {...rest}
          {...restField}
          onChangeText={onChange}
          errorMessage={errorMessage ?? errors[name]?.message}
        />
      )}
    />
  );
};

export default TextInputControl;
