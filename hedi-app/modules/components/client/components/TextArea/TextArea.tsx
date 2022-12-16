import React from "react";
import { ITextAreaProps, transformTextArea } from "./transformTextArea";
import { TextArea as CarbonTextArea } from "carbon-components-react";
export const TextArea = (props: ITextAreaProps) => {
  const data = transformTextArea(props);
  return <CarbonTextArea {...data} />;
};
