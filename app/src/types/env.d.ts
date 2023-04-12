declare module "@env" {
  export const APP_ENV: "development" | "preview" | "production";
  export const API_HOST: string;
  export const EXPO_GOOGLE_GUID: string;
  export const IOS_GOOGLE_GUID: string;
  export const ANDROID_GOOGLE_GUID: string;
  export const WEB_GOOGLE_GUID: string;
  export const SENTRY_DSN: string;
}
