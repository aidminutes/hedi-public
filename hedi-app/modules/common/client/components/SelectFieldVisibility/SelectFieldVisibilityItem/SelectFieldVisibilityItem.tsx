import React, { SyntheticEvent } from "react";
import { OverflowMenuItem } from "carbon-components-react";
import {
  ISelectFieldVisibilityItem,
  transformSelectFieldVisibilityItem,
} from "./transformSelectFieldVisibilityItem";

export const SelectFieldVisibilityItem = (
  props: ISelectFieldVisibilityItem
) => {
  const {
    itemText,
    fieldClassName,
    index,
    onChange,
  } = transformSelectFieldVisibilityItem(props);

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    onChange(parseFloat(value));
  };

  return (
    <OverflowMenuItem
      id={`${index}`}
      data-index={index}
      onClick={(e: SyntheticEvent<HTMLButtonElement>) => handleClick(e)}
      itemText={itemText}
      wrapperClassName={fieldClassName}
      value={index}
    />
  );
};
