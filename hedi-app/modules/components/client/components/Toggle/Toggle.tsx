import React from "react";
import { IToggleProps, transformToggle } from "./transformToggle";
import { Toggle as CarbonToggle } from "carbon-components-react";
export const Toggle = (props: IToggleProps) => {
  const data = transformToggle(props);
  return <CarbonToggle {...data} />;
};
