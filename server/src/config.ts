import dotenv from "dotenv";

dotenv.config({ path: !process.env.NODE_ENV ? ".env.dev" : undefined });

const CONFIG_SETTINGS = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  GUID: [
    process.env.EXPO_GOOGLE_GUID,
    process.env.IOS_GOOGLE_GUID,
    process.env.IOS_GOOGLE_GUID_DEV,
    process.env.ANDROID_GOOGLE_GUID,
    process.env.WEB_GOOGLE_GUID,
  ].filter((guid): guid is string => !!guid),
  USER_SECRET: process.env.USER_SECRET,
  APPLE_KEY_ID: process.env.APPLE_KEY_ID,
  APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
  APPLE_BUNDLE_ID: process.env.APPLE_BUNDLE_ID,
  APPLE_BUNDLE_ID_DEV: process.env.APPLE_BUNDLE_ID_DEV,
  APPLE_SECRET: process.env.APPLE_SECRET,
};

const initConfig = () => {
  if (!CONFIG_SETTINGS.USER_SECRET) {
    throw new Error("Missing user secret");
  } else {
    console.log("Loaded app config successfully!");
    return { ...CONFIG_SETTINGS, USER_SECRET: CONFIG_SETTINGS.USER_SECRET };
  }
};

const CONFIG = initConfig();

export const isProduction = CONFIG.NODE_ENV === "production";

export default CONFIG;
