import { Pressable, Text, StyleSheet } from "react-native";
import { PickerIOS, PickerProps } from "@react-native-picker/picker";
import {
  Control,
  Controller,
  FieldError,
  UseControllerProps,
} from "react-hook-form";
import BottomSheet from "../viewComponents/BotttomSheet";
import { useState } from "react";
import appColor from "@/styles/colors";
import fonts from "@/styles/fonts";

type Props = {
  control: Control<any>;
  name: string;
  options: { label: string; value: string | number }[];
  rules?: UseControllerProps["rules"];
  error?: FieldError | undefined;
} & PickerProps;

const PickerControl: React.FC<Props> = ({
  control,
  name,
  options,
  rules,
  error,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ref, ...restField } }) => (
        <>
          <Pressable style={styles.button} onPress={handleOpen}>
            <Text style={fonts.inputText}>
              {options.find((option) => option.value === value)?.label}
            </Text>
          </Pressable>
          <Text style={styles.error}>{error?.message}</Text>
          <BottomSheet visible={open} handleClose={handleClose}>
            <PickerIOS
              {...rest}
              {...restField}
              selectedValue={value}
              onValueChange={onChange}
            >
              {options.map((option) => (
                <PickerIOS.Item
                  key={option.value}
                  label={option.label ?? option.value}
                  value={option.value}
                />
              ))}
            </PickerIOS>
          </BottomSheet>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColor.grey4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  error: {
    ...fonts.small,
    color: appColor.error,
    marginLeft: 8,
    height: 16,
  },
});

export default PickerControl;
