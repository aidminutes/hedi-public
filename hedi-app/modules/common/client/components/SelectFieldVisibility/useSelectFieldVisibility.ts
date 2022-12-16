import { useState, useEffect } from "react";
import {
  Locked16,
  Connect16,
  EarthFilled16,
  CarbonIconType,
  UserAdmin16,
  Collaborate16,
  Events16,
} from "@carbon/icons-react";

const fallbackValue = 0;

export function useSelectFieldVisibility(
  value: number,
  onChange: (value: number) => void
) {
  const [initialValue, setInitialValue] = useState<number>(
    value || fallbackValue
  );
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [icon, setIcon] = useState<CarbonIconType>(getIcon(initialValue));

  useEffect(() => {
    setInitialValue(value);
  }, [value]);

  useEffect(() => {
    if (currentValue || currentValue === 0) setIcon(getIcon(currentValue));
  }, [currentValue]);

  const handleChange = (value: number) => {
    onChange(value);
    setCurrentValue(value);
  };

  return { initialValue, handleChange, currentValue, icon };
}

function getIcon(index: number) {
  return index === 0 ? Events16 : index === 1 ? UserAdmin16 : Collaborate16;
}
