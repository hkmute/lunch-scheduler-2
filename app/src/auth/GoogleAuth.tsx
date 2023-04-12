import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Pressable, Image, StyleSheet } from "react-native";
import {
  ANDROID_GOOGLE_GUID,
  EXPO_GOOGLE_GUID,
  IOS_GOOGLE_GUID,
  WEB_GOOGLE_GUID,
} from "@env";
import { ResponseType } from "expo-auth-session";
import googleLightIconNormal from "@/assets/icons/btn_google_signin_light_normal_web.png";
import googleLightIconPressed from "@/assets/icons/btn_google_signin_light_pressed_web.png";
import useLogin from "@/api/auth/useLogin";
import { useEffect } from "react";
import { useUserContext } from "@/context";

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth: React.FC = () => {
  const { updateUser } = useUserContext();
  const login = useLogin(updateUser);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      expoClientId: EXPO_GOOGLE_GUID,
      iosClientId: IOS_GOOGLE_GUID,
      androidClientId: ANDROID_GOOGLE_GUID,
      webClientId: WEB_GOOGLE_GUID,
      responseType: ResponseType.IdToken,
    },
    { useProxy: false }
  );

  useEffect(() => {
    if (response?.type === "success") {
      login.mutate({ type: "google", id_token: response.params.id_token });
    }
  }, [response]);

  const handlePress = () => {
    promptAsync();
  };

  return (
    <Pressable style={styles.button} disabled={!request} onPress={handlePress}>
      {({ pressed }) => (
        <Image
          style={styles.image}
          source={pressed ? googleLightIconPressed : googleLightIconNormal}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
  },
  image: {
    height: 52,
  },
});

export default GoogleAuth;
