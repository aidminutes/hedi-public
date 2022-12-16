import React from "react";
import { NumberInput } from "../NumberInput";
import { IValidatedNumberInputProps } from "@/modules/components/types/IValidatedNumberInputProps";
import { useValidation } from "@/modules/react/hooks";
import { transformValidatedNumberInput } from "./transformValidatedNumberInput";

// TODO align validation change handler with new carbon types

export const ValidatedNumberInput = React.forwardRef<
  HTMLInputElement,
  IValidatedNumberInputProps
>((props, ref) => {
  const {
    onChange,
    onValidation,
    value,
    validateFunction,
    setDefaultEnableValidation,
    ...rest
  } = transformValidatedNumberInput(props);

  //@ts-ignore
  const { handleChange } = useValidation(
    value,
    validateFunction,
    setDefaultEnableValidation,
    //@ts-ignore
    onChange,
    onValidation
  );
  //@ts-ignore
  return <NumberInput onChange={handleChange} ref={ref} {...rest} />;
});
