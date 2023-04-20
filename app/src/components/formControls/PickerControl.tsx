import { Pressable, Text, StyleSheet, Platform, View } from "react-native";
import { Picker, PickerProps } from "@react-native-picker/picker";
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

  if (Platform.OS === "ios") {
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
              <Picker
                {...rest}
                {...restField}
                selectedValue={value}
                onValueChange={onChange}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label ?? option.value}
                    value={option.value}
                  />
                ))}
              </Picker>
            </BottomSheet>
          </>
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ref, ...restField } }) => (
        <>
          <View style={styles.androidButton}>
            <Picker
              {...rest}
              {...restField}
              selectedValue={value}
              onValueChange={onChange}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label ?? option.value}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.error}>{error?.message}</Text>
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
  androidButton: {
    backgroundColor: appColor.grey4,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  error: {
    ...fonts.small,
    color: appColor.error,
    marginLeft: 8,
    minHeight: 16,
  },
});

export default PickerControl;
