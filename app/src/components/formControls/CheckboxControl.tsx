import { CheckBox, CheckBoxProps } from "@rneui/themed";
import { Control, Controller, UseControllerProps } from "react-hook-form";

type Props = {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps["rules"];
  label: string;
} & Omit<Omit<CheckBoxProps, "title">, "checked">;

const CheckboxControl: React.FC<Props> = ({
  control,
  name,
  rules,
  label,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { value, onChange, ref, ...restField } }) => (
        <CheckBox
          {...rest}
          {...restField}
          title={label}
          checked={value}
          onPress={() => onChange(!value)}
        />
      )}
    />
  );
};

export default CheckboxControl;
