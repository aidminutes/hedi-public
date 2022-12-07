import { ChangeEvent, useState } from "react";

export function useTextInput(defaultText = "") {
  const [value, setValue] = useState(defaultText);
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(e.target.value);
  }
  return [value, handleChange, setValue] as const;
}
