import { createContext, useContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const defaultError = {
  message: "",
};

const defaultErrorContext = {
  ...defaultError,
  updateError: (error: typeof defaultError) => {},
};

export const ErrorContext = createContext(defaultErrorContext);

export const useUpdateError = () => {
  const error = useContext(ErrorContext);
  return error.updateError;
};

export const ErrorContextProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState(defaultError);

  const value = useMemo(() => {
    return {
      ...error,
      updateError: setError,
    };
  }, [error]);

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
