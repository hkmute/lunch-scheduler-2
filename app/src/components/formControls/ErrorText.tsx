import { useTheme } from "@rneui/themed";
import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
  children: ReactNode;
};

const ErrorText: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <Text style={[styles.error, { color: theme?.colors?.error }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    margin: 5,
    fontSize: 12,
    paddingHorizontal: 10,
  },
});

export default ErrorText;
