import { ISelectComponent, ISelectItem } from "@/modules/components";
import { ComboBoxProps } from "carbon-components-react";
import { convertToCarbonSize } from "../../../utils";
import { ReactElement } from "react";

export interface IItems extends Omit<ISelectItem, "route"> {}

export interface IFuzzyFilterProps
  extends Pick<ISelectComponent, "helperText" | "size" | "items">,
    Omit<
      ComboBoxProps,
      | "helperText"
      | "size"
      | "labelText"
      | "placeholder"
      | "items"
      | "onChange"
      | "itemToElement"
      | "defaultValue"
      | "value"
    > {
  onChange?: (item: ISelectItem) => void;
  itemToElement?: (item: ISelectItem) => ReactElement;
  defaultValue?: ISelectItem;
  value?: ISelectItem;
  multipleStringMatch?: boolean;
  placeholder?: string;
}

export function transformFuzzyFilterDropdown(props: IFuzzyFilterProps) {
  const {
    titleText,
    helperText,
    id,
    items,
    size,
    onChange,
    itemToElement,
    defaultValue,
    value,
    multipleStringMatch,
    placeholder,
  } = props;

  return {
    placeholder: placeholder || "Text missing",
    helperText,
    size: convertToCarbonSize(size),
    titleText,
    items: items || [],
    id,
    onChange,
    itemToElement,
    ariaLabel: helperText || "Choose an item",
    defaultValue,
    value,
    multipleStringMatch,
  };
}
