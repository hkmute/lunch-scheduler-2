import { CreateCodeData } from "@/api/room/useCreateCode";
import { EditCodeData } from "@/api/room/useEditCode";
import { useCodeContext } from "@/context";
import appColor from "@/styles/colors";
import fonts from "@/styles/fonts";
import { Button, Text, Icon } from "@rneui/themed";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import TextInputControl from "../formControls/TextInputControl";

type Props = {
  mutate:
    | UseMutateFunction<any, unknown, CreateCodeData>
    | UseMutateFunction<any, unknown, EditCodeData>;
  isLoading: boolean;
  defaultValues?: {
    name: string;
    options: { id?: number; name: string }[];
  };
};

const RoomForm: React.FC<Props> = ({ mutate, isLoading, defaultValues }) => {
  const { code } = useCodeContext();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, ...rest },
  } = useForm({
    defaultValues: defaultValues || {
      name: "",
      options: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
    rules: {
      validate: {
        minItems: (items) => {
          if (items.filter((item) => !!item.name).length < 1) {
            return "必須填寫";
          }
        },
      },
    },
  });

  const optionsLength = getValues("options").length;

  const handleAdd = () => {
    append({ name: "" });
  };

  const handleRemove = (index: number) => () => {
    remove(index);
  };

  const handleSubmitPress = handleSubmit(({ name, options }) => {
    const optionsToSubmit = options.map((option, i) => {
      if (!!dirtyFields.options?.[i]?.name) {
        return { name: option.name };
      }
      return option;
    });
    mutate({ code, name, options: optionsToSubmit });
  });

  return (
    <View>
      <TextInputControl
        name="name"
        label="團隊名稱"
        control={control}
        rules={{ required: "必須填寫" }}
      />
      <View>
        <Text style={fonts.label}>選項</Text>
        {fields.map((field, index) => (
          <View key={field.id} style={styles.optionRow}>
            <View style={styles.optionField}>
              <TextInputControl
                name={`options.${index}.name`}
                control={control}
                renderErrorMessage={index === fields.length - 1}
                errorMessage={
                  index === fields.length - 1
                    ? errors.options?.root?.message
                    : undefined
                }
              />
            </View>
            <Button
              color="secondary"
              style={styles.removeButton}
              disabled={optionsLength <= 1}
              icon={
                <Icon
                  type="material-community"
                  name="close"
                  color={appColor.white}
                />
              }
              onPress={handleRemove(index)}
            />
          </View>
        ))}
        {optionsLength < 20 && (
          <Button
            color="secondary"
            style={styles.addButton}
            icon={
              <Icon
                type="material-community"
                name="plus"
                color={appColor.white}
              />
            }
            onPress={handleAdd}
          />
        )}
      </View>
      <Button
        style={styles.submitButton}
        title="確認"
        onPress={handleSubmitPress}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    marginRight: 8,
    marginBottom: 12,
  },
  optionField: {
    flex: 1,
  },
  removeButton: {
    width: 48,
  },
  addButton: {
    marginHorizontal: 8,
    width: 48,
    alignSelf: "flex-end",
  },
  submitButton: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
});

export default RoomForm;