import React from "react";
import { OverflowMenu } from "carbon-components-react";
import { SelectFieldVisibilityItem } from "./SelectFieldVisibilityItem";
import {
  ISelectFieldVisibilty,
  transformSelectFieldVisibilty,
} from "./transformSelectFieldVisibility";
import { useSelectFieldVisibility } from "./useSelectFieldVisibility";
export const SelectFieldVisibility = (props: ISelectFieldVisibilty) => {
  const {
    items,
    value,
    onChange,
    personalContext,
    wrapClass,
  } = transformSelectFieldVisibilty(props);
  const {
    initialValue,
    handleChange,
    currentValue,
    icon,
  } = useSelectFieldVisibility(value, onChange);

  return (
    <OverflowMenu
      renderIcon={icon}
      className={wrapClass}
      selectorPrimaryFocus={".locked"}>
      {items.map((item, index) => {
        return (
          <SelectFieldVisibilityItem
            key={item.label + index}
            value={personalContext ? 2 : currentValue || initialValue}
            onChange={handleChange}
            {...item}
          />
        );
      })}
    </OverflowMenu>
  );
};
