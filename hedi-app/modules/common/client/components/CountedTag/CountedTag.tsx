import React from "react";
import { FilterTagProps, Tag } from "carbon-components-react";
import { useCountedTag, ICountedTag } from "./useCountedTag";
export const CountedTag = (props: ICountedTag) => {
  const {
    handleClick,
    isActive,
    count,
    label,
    filter,
    activeColor,
    inactiveColor,
  } = useCountedTag(props);
  const tagProps: FilterTagProps = {
    type: isActive ? activeColor : inactiveColor,
    onClick: handleClick,
    filter: true,
  };
  if (!filter) delete (tagProps as any).filter;
  return (
    <Tag {...tagProps}>
      {label} ({count})
    </Tag>
  );
};
