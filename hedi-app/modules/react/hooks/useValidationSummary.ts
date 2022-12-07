import { useState } from "react";

export const useValidationSummary = () => {
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | string[];
  }>({});
  const setValidationError = (
    fieldName: string,
    errorText: string | string[]
  ) => {
    if (errorText)
      setValidationErrors(previous => ({
        ...previous,
        [fieldName]: errorText,
      }));
    else {
      setValidationErrors(previous => {
        const { [fieldName]: _, ...rest } = previous;
        return { ...rest };
      });
    }
  };
  return { validationErrors, setValidationError };
};
