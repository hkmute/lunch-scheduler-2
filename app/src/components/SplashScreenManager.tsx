import { useEffect, useMemo, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Animated, StyleSheet } from "react-native";
import Constants from "expo-constants";

SplashScreen.preventAutoHideAsync();

const SplashScreenManager: React.FC = () => {
  const [isAppReady, setAppReady] = useState(false);
  const [isAnimationCompleted, setAnimationCompleted] = useState(false);
  const animation = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setAnimationCompleted(true));
    }
  }, [isAppReady]);

  const onImageLoaded = () => {
    setTimeout(() => {
      SplashScreen.hideAsync().then(() => {
        setAppReady(true);
      });
    }, 300);
  };

  if (!isAnimationCompleted) {
    return (
      <Animated.Image
        style={[
          styles.image,
          {
            opacity: animation,
          },
        ]}
        source={{ uri: Constants.expoConfig?.splash?.image }}
        onLoadEnd={onImageLoaded}
      />
    );
  }

  return null;
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Constants.expoConfig?.splash?.backgroundColor,
    zIndex: 1000,
  },
});

export default SplashScreenManager;
