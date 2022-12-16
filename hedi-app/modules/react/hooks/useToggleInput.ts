import { ChangeEvent, useState } from "react";

export function useToggleInput(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.checked);
  }
  return [value, handleChange, setValue] as const;
}
