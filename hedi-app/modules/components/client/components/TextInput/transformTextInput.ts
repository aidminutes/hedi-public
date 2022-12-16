import { ITextInputComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { TextInputProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type ITextInputProps = PartialBy<ITextInputComponent, "kind"> &
  Omit<TextInputProps, "helperText" | "labelText" | "type">;

export function transformTextInput(props: ITextInputProps): TextInputProps {
  const {
    kind,
    labelText,
    placeholder,
    id,
    helperText,
    type,
    ariaLabel,
    isRequired,
    name,
    ...rest
  } = props;
  let { className } = rest;
  if (isRequired) className = `${className} required-input`.trim();

  return {
    name: name || id,
    labelText: BasicHTML({ data: labelText }) || "",
    required: isRequired,
    placeholder,
    id,
    helperText: BasicHTML({ data: helperText }),
    type,
    "aria-label": ariaLabel || "",
    ...rest,
    className,
  };
}
