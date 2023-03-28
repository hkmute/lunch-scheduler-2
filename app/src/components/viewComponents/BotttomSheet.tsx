import appColor from "@/styles/colors";
import { Animated, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { BottomSheet as RNEBottomSheet } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
  visible: boolean;
};

const BottomSheet: React.FC<Props> = ({ children, visible, handleClose }) => {
  const translateAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      translateIn();
    } else {
      translateOut();
    }
  }, [visible]);

  const translateIn = () => {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const translateOut = () => {
    Animated.timing(translateAnim, {
      toValue: Dimensions.get("screen").height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBackdropPress = () => {
    translateOut();
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <RNEBottomSheet
      modalProps={{ animationType: "fade" }}
      isVisible={visible}
      onBackdropPress={handleBackdropPress}
    >
      <Animated.View style={{ transform: [{ translateY: translateAnim }] }}>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </Animated.View>
    </RNEBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
  },
  content: {
    padding: 16,
  },
});

export default BottomSheet;
