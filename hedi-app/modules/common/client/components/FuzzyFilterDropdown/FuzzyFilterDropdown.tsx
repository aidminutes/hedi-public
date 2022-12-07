import React from "react";
import { ComboBox } from "carbon-components-react";
import {
  transformFuzzyFilterDropdown,
  IFuzzyFilterProps,
} from "./transformFuzzyFilterDropdown";
import { useFuzzyFilter } from "./useFuzzyFilter";
import { BasicHTML } from "@/modules/react/html";

export const FuzzyFilterDropdown = (props: IFuzzyFilterProps) => {
  const {
    items,
    onChange,
    value,
    defaultValue,
    itemToElement,
    multipleStringMatch,
    ...rest
  } = transformFuzzyFilterDropdown(props);
  const {
    fuzzyItems,
    handleInputChange,
    handleChange,
    initialValue,
    filter,
  } = useFuzzyFilter(items, onChange, value, defaultValue, multipleStringMatch);
  return (
    <ComboBox
      {...rest}
      items={fuzzyItems}
      onInputChange={(inputValue: string | undefined) =>
        handleInputChange(inputValue)
      }
      onChange={({ selectedItem }) => {
        if (selectedItem) handleChange(selectedItem);
      }}
      initialSelectedItem={initialValue}
      itemToElement={item => {
        if (itemToElement) {
          return itemToElement(item);
        }
        if (filter.trim().length > 0) {
          const matches = item.label.match(
            RegExp(
              filter.trim().replace(/\s+/g, " ").split(" ").join("|"),
              "ig"
            )
          );
          let boldened = item.label;
          matches?.forEach(
            (part: any) =>
              (boldened = boldened.replace(
                new RegExp(part, "gi"),
                "<strong>" + part + "</strong>"
              ))
          );
          return (
            <span>
              <BasicHTML data={boldened} />
            </span>
          );
        }
        return <span>{item.label}</span>;
      }}
    />
  );
};
