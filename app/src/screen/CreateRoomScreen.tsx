import TextInputControl from "@/components/formControls/TextInputControl";
import LoginButtons from "@/components/LoginButtons";
import { UserContext } from "@/context/UserContext";
import fonts from "@/styles/fonts";
import { useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, Icon } from "@rneui/themed";
import appColor from "@/styles/colors";
import useCreateCode from "@/api/room/useCreateCode";
import { RootStackParamList } from "@/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "CreateRoom">;

const CreateRoomScreen: React.FC<Props> = ({ navigation }) => {
  const user = useContext(UserContext);

  const { mutate, isLoading } = useCreateCode({
    onSuccess: (res) => {
      const code = res.data?.code;
      if (code) {
        navigation.navigate("Room", { screen: "Today", params: { code } });
      }
    },
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
    mutate({ name, options });
  });

  if (!user.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>請登入或註冊</Text>
        <LoginButtons />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loginText: {
    ...fonts.title,
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

export default CreateRoomScreen;
