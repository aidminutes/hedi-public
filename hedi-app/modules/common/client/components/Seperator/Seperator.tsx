import React from "react";
import { transformSeperator, ISeperator } from "./transformSeperator";

export const Seperator = (props: ISeperator) => {
  const { seperatorClassName } = transformSeperator(props);
  return <div className={seperatorClassName} />;
};
