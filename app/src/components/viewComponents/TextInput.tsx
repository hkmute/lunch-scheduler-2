import { Input, InputProps } from "@rneui/themed";
import { forwardRef } from "react";

const TextInput: React.ForwardRefExoticComponent<InputProps> = forwardRef(
  (props, ref) => {
    return <Input ref={ref} {...props} />;
  }
);

export default TextInput;
