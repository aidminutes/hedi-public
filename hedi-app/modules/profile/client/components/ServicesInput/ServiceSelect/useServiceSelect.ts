import { ISelectItem } from "@/modules/components";
import { useEffect, useState } from "react";

export type ISelectableSelectItem = ISelectItem & {
  selected?: boolean;
};

const markSelected = (items: ISelectItem[], selected = [] as string[]) =>
  items.map(
    item =>
      ({
        ...item,
        selected: !!selected.includes(item.route),
      } as ISelectableSelectItem)
  );

export function useServiceSelection(
  id: string,
  items: ISelectItem[],
  selected = [] as string[],
  onChange?: (routes: string[]) => void
) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [selectItems, setSelectItems] = useState(markSelected(items, selected));

  useEffect(() => {
    setSelectItems(markSelected(items, selected));
  }, [id, selected]);

  const handleItemToggle = (item: ISelectableSelectItem) => {
    setSelectItems(p => {
      const state = p.map(s => {
        if (s.route === item.route) s.selected = !s.selected;
        return s;
      });
      if (onChange) onChange(state.filter(i => i.selected).map(i => i.route));
      return state;
    });
  };

  const handleItemRemove = (route: string) => {
    setSelectItems(p => {
      const state = p.map(s => {
        if (s.route === route && s.selected) s.selected = false;
        return s;
      });
      if (onChange) onChange(state.filter(i => i.selected).map(i => i.route));
      return state;
    });
  };

  const handleExpandToggle = () => {
    setIsExpanded(prev => !prev);
  };
  return {
    isExpanded,
    handleExpandToggle,
    selectItems,
    handleItemToggle,
    handleItemRemove,
  };
}
