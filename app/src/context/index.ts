import { useContext } from "react";
import { CodeContext } from "./CodeContext";
import { ErrorContext } from "./ErrorContext";
import { UserContext } from "./UserContext";

export const useUserContext = () => useContext(UserContext);
export const useErrorContext = () => useContext(ErrorContext);
export const useCodeContext = () => useContext(CodeContext);
