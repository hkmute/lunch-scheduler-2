module.exports = {
  expo: {
    name: "食乜",
    slug: "lunch-scheduler",
    scheme: "eat-mud",
    version: "1.0.0",
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
    plugins: ["expo-apple-authentication", "sentry-expo"],
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.hkmute.lunchscheduler",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#455a64",
      },
      package: "com.hkmute.lunchscheduler",
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
      policy: "appVersion",
    },
  },
};
