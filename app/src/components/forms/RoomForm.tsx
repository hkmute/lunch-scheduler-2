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
import CheckboxControl from "../formControls/CheckboxControl";

type Props = {
  mutate:
    | UseMutateFunction<any, unknown, CreateCodeData>
    | UseMutateFunction<any, unknown, EditCodeData>;
  isLoading: boolean;
  defaultValues?: {
    name: string;
    options: { id?: number; name: string }[];
    restrictGuestEdit?: boolean;
  };
  isOwner: boolean;
};

const RoomForm: React.FC<Props> = ({
  mutate,
  isLoading,
  defaultValues,
  isOwner,
}) => {
  const { code } = useCodeContext();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, ...rest },
    reset,
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
          if (items.filter((item) => !!item.name.trim()).length < 1) {
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

  const handleSubmitPress = handleSubmit(
    ({ name, options, restrictGuestEdit }) => {
      const optionsToSubmit = options.reduce((acc, option, i) => {
        const optionName = option.name.trim();
        if (!optionName) {
          return acc;
        }
        if (!!dirtyFields.options?.[i]?.name) {
          return [...acc, { name: optionName }];
        }
        return [...acc, option];
      }, [] as typeof options);
      mutate({
        code,
        name,
        options: optionsToSubmit,
        allowGuestEdit: !restrictGuestEdit,
      });
    }
  );

  return (
    <View>
      <TextInputControl
        name="name"
        label="團隊名稱"
        control={control}
        rules={{
          validate: (value) => {
            if (!value.trim()) {
              return "必須填寫";
            }
          },
        }}
      />
      {isOwner && (
        <CheckboxControl
          name="restrictGuestEdit"
          label="只限擁有者修改"
          control={control}
          containerStyle={styles.checkbox}
        />
      )}
      <View>
        <Text style={fonts.label}>餐廳選項</Text>
        {fields.map((field, index) => (
          <View key={field.id} style={styles.optionRow}>
            <View style={styles.optionField}>
              <TextInputControl
                name={`options.${index}.name`}
                control={control}
                placeholder="輸入餐廳名稱"
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
            containerStyle={styles.addButton}
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
        containerStyle={styles.submitButton}
        title="確認"
        onPress={handleSubmitPress}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginBottom: 16,
  },
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
