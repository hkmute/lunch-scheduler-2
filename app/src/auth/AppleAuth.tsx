import useLogin from "@/api/auth/useLogin";
import { useUserContext } from "@/context";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Application from "expo-application";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const AppleAuth: React.FC = () => {
  const { updateUser } = useUserContext();
  const login = useLogin(updateUser);
  const [show, setShow] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then((isAvailable) =>
      setShow(isAvailable)
    );
  }, []);

  if (!show) {
    return null;
  }

  const handlePress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      if (credential.identityToken) {
        login.mutate({
          type: "apple",
          id_token: credential.identityToken,
          authorizationCode: credential.authorizationCode,
          displayName: credential.fullName
            ? `${credential.fullName?.givenName} ${credential.fullName?.familyName}`
            : undefined,
          isDev:
            Application.applicationId === "host.exp.exponent" ||
            !!Application.applicationId?.includes("dev"),
        });
      }
    } catch (err) {
      if (err.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={styles.button}
      onPress={handlePress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 210,
  },
});

export default AppleAuth;
