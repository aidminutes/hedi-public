import React, { useEffect, useState } from "react";
import { TagTypeName } from "carbon-components-react";

export interface ICountedTag {
  label: string;
  elementType?: string;
  count: number;
  onChange?: (state: boolean, label: string) => void;
  type?: TagTypeName;
  checked?: boolean;
  defaultChecked?: boolean;
  filter?: boolean;
}

export function useCountedTag(props: ICountedTag) {
  const {
    label,
    count,
    onChange,
    type,
    elementType,
    checked,
    defaultChecked,
    filter,
  } = props;

  const inactiveColor: TagTypeName = "gray";
  const activeColor = type || "blue";

  const [isActive, setIsActive] = useState(checked ?? defaultChecked ?? false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsActive(prev => {
        if (prev === checked) return prev;
        if (onChange) onChange(checked, elementType || label);
        return checked;
      });
    }
  }, [checked]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (filter && (e.target as HTMLElement).nodeName.toUpperCase() === "SPAN")
      return;
    const newState = !isActive;
    setIsActive(newState);
    if (onChange) onChange(newState, elementType || label);
  };

  return {
    handleClick,
    filter,
    isActive,
    activeColor,
    inactiveColor,
    count,
    label,
  };
}
