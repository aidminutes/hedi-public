import React from "react";
import { TextInput } from "../TextInput";
import { IValidatedTextInputProps } from "@/modules/components/types";
import { useValidation } from "@/modules/react/hooks";
import { transformValidatedTextInput } from "./transformValidatedTextInput";

export const ValidatedTextInput = React.forwardRef<
  HTMLInputElement,
  IValidatedTextInputProps
>((props, ref) => {
  const {
    value,
    validateFunction,
    enableValidationOrDefault,
    onChange,
    onValidation,
    ...rest
  } = transformValidatedTextInput(props);

  const { handleChange } = useValidation(
    value,
    validateFunction,
    enableValidationOrDefault,
    onChange,
    onValidation
  );
  return <TextInput onChange={handleChange} ref={ref} {...rest} />;
});
