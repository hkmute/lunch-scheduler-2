import appColor from "@/styles/colors";
import fonts from "@/styles/fonts";
import { asyncGetGuideId, asyncSetGuideId } from "@/utils/asyncStorage";
import { Button, Icon, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View, StyleSheet } from "react-native";

const GuideButton: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    asyncGetGuideId().then((guideId) => {
      const GUIDE_ID = "1.0.1";
      if (guideId !== GUIDE_ID) {
        // temp add delay to prevent splash screen error
        setTimeout(() => {
          setOpen(true);
          asyncSetGuideId(GUIDE_ID);
        }, 500);
      }
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handelClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        icon={<Icon name="info-outline" color={theme.colors.white} />}
        onPress={handleOpen}
      />
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handelClose}
      >
        <Pressable onPress={handelClose} style={styles.backdrop}>
          <Pressable style={styles.content}>
            <Text style={styles.title}>使用說明</Text>
            <View style={styles.block}>
              <Text style={styles.text}>
                建立或加入團隊後，每日會按以下流程抽出一間餐廳。團隊擁有者可在設定頁面修改餐廳選項。
              </Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.text}>1. 投票時段 (8:00 - 11:00)</Text>
              <Text style={styles.description}>
                顯示3間餐廳，每人可投票1間餐廳，提高餐廳的出現率。
              </Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.text}>2. 顯示結果 (11:00 - 8:00)</Text>
              <Text style={styles.description}>
                系統會根據餐廳的投票比率，抽出今日的結果。
              </Text>
            </View>
            <View style={styles.future}>
              <Text style={styles.text}>未來功能</Text>
              <Text style={styles.description}>- 推送通知</Text>
              <Text style={styles.description}>- 擁有團隊一覽</Text>
              <Text style={styles.description}>- 自訂投票時段</Text>
            </View>
            <Button title="確認" onPress={handelClose} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    backgroundColor: appColor.white,
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
  },
  title: {
    ...fonts.title,
    textAlign: "center",
    marginBottom: 16,
  },
  block: {
    marginBottom: 8,
  },
  text: {
    ...fonts.body,
    marginBottom: 4,
  },
  description: {
    ...fonts.light,
  },
  future: {
    marginVertical: 16,
  },
});

export default GuideButton;
