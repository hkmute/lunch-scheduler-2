import fonts from "@/styles/fonts";
import { View, Text } from "react-native";
import CodeRow from "./CodeRow";
import { StyleSheet } from "react-native";
import appColor from "@/styles/colors";

type Props = {
  code: string;
  optionList: {
    id: number;
    name: string;
    options: { id: number; name: string }[];
  };
  voteHour: number;
  lotteryHour: number;
};

const GuestOptionList: React.FC<Props> = ({
  code,
  optionList,
  voteHour,
  lotteryHour,
}) => {
  return (
    <View>
      <CodeRow code={code} />
      <Text style={styles.title}>團隊名稱</Text>
      <View style={styles.content}>
        <Text style={styles.contentText}>{optionList.name}</Text>
      </View>
      <View>
        <Text style={styles.title}>投票開始時間</Text>
        <View style={styles.content}>
          <Text style={styles.contentText}>{voteHour}:00</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>結果抽選時間</Text>
        <View style={styles.content}>
          <Text style={styles.contentText}>{lotteryHour}:30</Text>
        </View>
      </View>
      <Text style={styles.title}>餐廳選項</Text>
      {optionList.options.map((option) => (
        <View key={option.id} style={styles.content}>
          <Text style={styles.contentText}>{option.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...fonts.label,
    paddingTop: 12,
  },
  content: {
    backgroundColor: appColor.grey4,
    borderColor: appColor.grey5,
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  contentText: {
    ...fonts.body,
    color: appColor.black,
    fontWeight: "500",
  },
});

export default GuestOptionList;
