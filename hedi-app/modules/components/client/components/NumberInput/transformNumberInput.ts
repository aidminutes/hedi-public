import { INumberInputComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { NumberInputProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type INumberInputProps = PartialBy<INumberInputComponent, "kind"> &
  Omit<NumberInputProps, "min" | "max" | "value" | "helperText" | "label">;

export function transformNumberInput(
  props: INumberInputProps
): NumberInputProps {
  const { helperText, label, kind, value, isRequired, ...rest } = props;
  let { className } = rest;
  if (isRequired) className = `${className} required-input`.trim();
  return {
    helperText: BasicHTML({ data: helperText }),
    label: BasicHTML({ data: label }),
    value: value ?? "",
    required: isRequired,
    ...rest,
    className,
  };
}
