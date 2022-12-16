import { useEffect, useState } from "react";
import { ISelectItem } from "@/modules/components";
import { ICountedTag } from "../CountedTag/useCountedTag";
import { ICountedTagMultiSelectProps } from "./CountedTagMultiSelect";

type ICountedSelectItem = ISelectItem &
  Pick<ICountedTag, "count"> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
  };

export const useCountedTagMultiSelect = (
  props: Omit<ICountedTagMultiSelectProps, "type">
) => {
  const { defaultSelected, counts, hideZeroCounted, items, onChange } = props;

  const [countedSelects, setCountedSelects] = useState<ICountedSelectItem[]>(
    items.map(item => ({
      count: 0,
      checked: defaultSelected?.includes(item.route),
      defaultChecked: defaultSelected?.includes(item.route),
      ...item,
    }))
  );

  useEffect(() => {
    setCountedSelects(prev =>
      prev.map(item => {
        const newState = defaultSelected?.includes(item.route);
        if (item.defaultChecked !== newState) {
          item.checked = newState;
          item.defaultChecked = newState;
        }
        return item;
      })
    );
  }, [defaultSelected]);

  const handleItemChange = (
    checked: boolean,
    selectItem: ICountedSelectItem
  ) => {
    setCountedSelects(prev => {
      const i = prev.findIndex(item => item.route === selectItem.route);
      if (
        i > -1 &&
        prev[i].checked !== checked &&
        (selectItem.count > 0 || !hideZeroCounted)
      ) {
        prev[i].checked = checked;
        const newState = [...prev];
        if (onChange) {
          const selectedItems = newState.filter(
            item => item.checked && (item.count > 0 || !hideZeroCounted)
          );
          const selected = selectedItems.map(item => item.route);
          onChange(selected, selectedItems);
        }

        return newState;
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    setCountedSelects(prev => {
      const newItems = [...items];
      let newState = prev.filter(item => {
        const id = newItems.findIndex(obj => obj.route === item.route);
        const match = id > -1;
        if (match) newItems.splice(id, 1);
        return match;
      });
      return newState
        .concat(
          newItems.map(item => ({
            count: 0,
            ...item,
          }))
        )
        .map(item => {
          item.count = counts?.[item.route] ?? 0;
          item.onChange = (checked: boolean) => handleItemChange(checked, item);
          return item;
        });
    });
  }, [counts, items]);

  return countedSelects;
};
