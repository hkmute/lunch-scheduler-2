import { asyncGetCode, asyncSetCode } from "@/utils/asyncStorage";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

const defaultUserContext = {
  code: "",
  updateCode: (code: string) => {},
};

export const CodeContext = createContext(defaultUserContext);

export const CodeContextProvider: React.FC<Props> = ({ children }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    asyncGetCode().then((code) => {
      if (code) {
        setCode(code);
      }
    });
  }, []);

  const updateCode = useCallback(async (code: string) => {
    await asyncSetCode(code);
    setCode(code);
  }, []);

  const value = useMemo(() => {
    return {
      code,
      updateCode,
    };
  }, [code]);

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
