module.exports = () => {
  const isExpoGo = process.env.APP_ENV === undefined;
  const isDev = process.env.APP_ENV !== "production";

  return {
    expo: {
      name: isDev ? "EAT MUD DEV" : "食乜",
      slug: "lunch-scheduler",
      scheme: "eat-mud",
      version: process.env.npm_package_version,
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "cover",
        backgroundColor: "#455a64",
      },
      updates: {
        fallbackToCacheTimeout: 0,
        url: "https://u.expo.dev/0b15b5df-0820-47a2-a2a4-d09ec5af0fc0",
      },
      assetBundlePatterns: ["**/*"],
      plugins: [
        "expo-apple-authentication",
        "sentry-expo",
        [
          "expo-build-properties",
          {
            ios: {
              flipper: true,
            },
          },
        ],
      ],
      hooks: {
        postPublish: [
          {
            file: "sentry-expo/upload-sourcemaps",
            config: {
              organization: process.env.SENTRY_ORG,
              project: process.env.SENTRY_PROJECT,
            },
          },
        ],
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: isDev
          ? "com.hkmute.lunchscheduler-dev"
          : "com.hkmute.lunchscheduler",
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#455a64",
        },
        package: isDev
          ? "com.hkmute.lunchscheduler_dev"
          : "com.hkmute.lunchscheduler",
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      extra: {
        eas: {
          projectId: "0b15b5df-0820-47a2-a2a4-d09ec5af0fc0",
        },
      },
      runtimeVersion: {
        policy: isDev ? "sdkVersion" : "appVersion",
      },
    },
  };
};
