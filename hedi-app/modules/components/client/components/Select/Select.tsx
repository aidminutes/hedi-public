import React from "react";
import { Select as CarbonSelect, SelectItem } from "carbon-components-react";
import { transformSelect, ISelectProps } from "./transformSelect";

export const Select = (props: ISelectProps) => {
  const { selectItems, ...rest } = transformSelect(props);

  return (
    <CarbonSelect {...rest}>
      {selectItems.map(item => (
        <SelectItem {...item} key={item.value} />
      ))}
    </CarbonSelect>
  );
};
