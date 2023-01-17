import useMe from "@/api/auth/useMe";
import { createContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export type User = {
  id: number;
  displayName: string;
  token: string;
};

const defaultUser = {
  id: 0,
  displayName: "",
  token: "",
};

const defaultUserContext = {
  ...defaultUser,
  updateUser: (user: User) => {},
};

export const UserContext = createContext(defaultUserContext);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useMe(setUser);

  const value = useMemo(() => {
    return {
      ...user,
      updateUser: setUser,
    };
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
