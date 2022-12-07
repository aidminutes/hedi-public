import { ITextAreaComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { TextAreaProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type ITextAreaProps = PartialBy<ITextAreaComponent, "kind"> &
  Omit<TextAreaProps, "helperText" | "id" | "labelText">;

export function transformTextArea(props: ITextAreaProps): TextAreaProps {
  const { id, name, kind, isRequired, labelText, helperText, ...rest } = props;
  let { className } = rest;
  if (isRequired) className = `${className} required-input`.trim();

  return {
    name: name || id,
    labelText: BasicHTML({ data: labelText }) || "",
    helperText: BasicHTML({ data: helperText }),
    id,
    required: isRequired,
    ...rest,
    className,
  };
}
