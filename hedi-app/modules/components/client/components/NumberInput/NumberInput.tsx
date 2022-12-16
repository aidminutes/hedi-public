import React from "react";
import { NumberInput as CarbonNumberInput } from "carbon-components-react";
import {
  transformNumberInput,
  INumberInputProps,
} from "./transformNumberInput";

export const NumberInput = (props: INumberInputProps) => {
  const data = transformNumberInput(props);

  return <CarbonNumberInput {...data} />;
};
