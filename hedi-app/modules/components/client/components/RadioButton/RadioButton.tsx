import { PartialBy } from "@/modules/common/utils";
import { IRadioButtonGroupComponent } from "@/modules/components/types/IRadioButtonGroupComponent";
import {
  RadioButtonGroup,
  RadioButtonGroupProps,
} from "carbon-components-react";
import { RadioButton as CarbonRadioButton } from "carbon-components-react";
import React from "react";

export type IRadioButtonProps = PartialBy<IRadioButtonGroupComponent, "kind"> &
  Omit<RadioButtonGroupProps, "labelText" | "id" | "name">;

export const RadioButton = (props: IRadioButtonProps) => {
  const { items, ...rest } = props;
  return (
    <RadioButtonGroup {...rest}>
      {items.map((item, index) => (
        <CarbonRadioButton {...item} key={item.value + index} />
      ))}
    </RadioButtonGroup>
  );
};
