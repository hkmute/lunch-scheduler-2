import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";

type Props = {
  children: React.ReactNode;
};

const NavContainer: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();

  const NavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
    },
  };

  return <NavigationContainer theme={NavTheme}>{children}</NavigationContainer>;
};

export default NavContainer;
