import { ISelectItem } from "@/modules/components";
import { useState, useEffect } from "react";
const fallbackSelectItem = { label: "", route: "" };

export function useFuzzyFilter(
  items: ISelectItem[],
  onChange?: (item: ISelectItem) => void,
  value?: ISelectItem,
  defaultValue?: ISelectItem,
  multipleStringMatch?: boolean
) {
  const [fuzzyItems, setFuzzyItems] = useState(items);
  const [fuzzyValue, setFuzzyValue] = useState<ISelectItem>(
    value ?? defaultValue ?? fallbackSelectItem
  );
  const [initialValue, setInitialValue] = useState(value ?? null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setFuzzyItems(items);
  }, [items]);

  useEffect(() => {
    setFuzzyValue(value ?? defaultValue ?? fallbackSelectItem);
  }, [value, defaultValue]);

  useEffect(() => {
    setInitialValue(value ?? null);
  }, [value]);

  useEffect(() => {
    filterFuzzyItems(filter);
  }, [filter]);

  const hasWord = (word: string, str: string) => {
    if (multipleStringMatch)
      return RegExp(
        word.trim().replace(/\s+/g, " ").split(" ").join("|"),
        "i"
      ).test(str);
    return RegExp(word, "i").test(str);
  };

  const filterFuzzyItems = (value: string) => {
    const newItems = items.filter(item => hasWord(value, item.label));
    setFuzzyItems(newItems);
  };

  const handleInputChange = (inputValue?: string) => {
    if (!inputValue) {
      setFilter("");
      setFuzzyItems(items);
      return;
    }
    setFilter(inputValue);
  };

  const handleChange = (value?: ISelectItem) => {
    if (value && onChange) {
      onChange(value);
      setFuzzyValue(value);
    }
  };

  return {
    fuzzyItems,
    handleInputChange,
    handleChange,
    fuzzyValue,
    initialValue,
    filter,
  };
}
