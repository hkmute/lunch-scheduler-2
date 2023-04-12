import useMe from "@/api/auth/useMe";
import { asyncGetDeviceId, asyncSetDeviceId } from "@/utils/asyncStorage";
import { createContext, useEffect, useMemo, useState } from "react";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

type Props = {
  children: React.ReactNode;
};

export type User = {
  id: number;
  displayName: string;
  token: string;
};

export const defaultUser = {
  id: 0,
  displayName: "",
  token: "",
};

const defaultUserContext = {
  ...defaultUser,
  deviceId: "",
  updateUser: (user: User) => {},
};

export const UserContext = createContext(defaultUserContext);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [deviceId, setDeviceId] = useState("");

  useMe(setUser);

  useEffect(() => {
    asyncGetDeviceId().then(async (deviceId) => {
      if (!deviceId) {
        const newDeviceId = nanoid(24);
        await asyncSetDeviceId(newDeviceId);
        setDeviceId(newDeviceId);
        return;
      }
      setDeviceId(deviceId);
    });
  }, []);

  const value = useMemo(() => {
    return {
      ...user,
      deviceId,
      updateUser: setUser,
    };
  }, [user, deviceId]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
