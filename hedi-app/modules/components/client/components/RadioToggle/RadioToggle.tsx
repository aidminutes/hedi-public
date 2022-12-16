import { PartialBy } from "@/modules/common/utils";
import { IToggleComponent } from "@/modules/components/types/IToggleComponent";
import {
  RadioButton,
  RadioButtonGroup,
  RadioButtonValue,
  ToggleProps,
} from "carbon-components-react";
import React, { useEffect, useState } from "react";

export type IRadioToggleProps = PartialBy<IToggleComponent, "kind"> &
  Omit<ToggleProps, "id" | "value" | "size" | "onToggle" | "onChange"> & {
    onChange?: (toggle: boolean | undefined) => void;
  };

const nullAsUndefined = (input: boolean | null | undefined) =>
  typeof input === "boolean" ? input : undefined;

export const RadioToggle = (props: IRadioToggleProps) => {
  const {
    id,
    labelText,
    labelA,
    labelB,
    defaultToggled,
    toggled: toggledInput,
    onChange,
  } = props;
  const toggled = nullAsUndefined(toggledInput);

  const [state, setState] = useState<boolean | undefined>(toggled);
  useEffect(() => {
    setState(() => {
      if (onChange) onChange(toggled);
      return toggled;
    });
  }, [toggled]);

  const handleBtnGroupChange = (newSelection: RadioButtonValue) => {
    setState(() => {
      const newState = !!newSelection.valueOf();
      if (onChange) onChange(newState);
      return newState;
    });
  };
  const valueSelected =
    typeof state === "boolean" ? (state ? 1 : 0) : undefined;
  const defaultSelected =
    typeof state === "boolean"
      ? valueSelected
      : typeof defaultToggled === "boolean"
      ? defaultToggled
        ? 1
        : 0
      : undefined;
  return (
    <RadioButtonGroup
      name={id}
      legendText={labelText}
      defaultSelected={defaultSelected}
      valueSelected={valueSelected}
      onChange={handleBtnGroupChange}>
      <RadioButton labelText={labelA} value={0} />
      <RadioButton labelText={labelB} value={1} />
    </RadioButtonGroup>
  );
};
