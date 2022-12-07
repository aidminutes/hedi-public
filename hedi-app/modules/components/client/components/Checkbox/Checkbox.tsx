import React from "react";
import { Checkbox as CarbonCheckbox } from "carbon-components-react";

import { transformCheckbox, ICheckboxProps } from "./transformCheckbox";

export const Checkbox = (props: ICheckboxProps) => {
  const data = transformCheckbox(props);

  return <CarbonCheckbox {...data} />;
};
