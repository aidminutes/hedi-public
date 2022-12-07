import React from "react";
import { TextInput as CarbonTextInput } from "carbon-components-react";
import { ITextInputProps, transformTextInput } from "./transformTextInput";

export const TextInput = (props: ITextInputProps) => {
  const data = transformTextInput(props);
  return <CarbonTextInput {...data} />;
};
