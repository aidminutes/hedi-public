import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { IValidationFunction } from "../validation";
import { getValidationErrorText } from "../validation/ValidationErrorMessages";

export function useValidation<T>(
  value: T,
  validateFn: IValidationFunction | IValidationFunction[],
  enableValidation?: Boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onValidation?: (textError: string | string[]) => void
) {
  const router = useRouter();

  const isInvalid = (value: any) =>
    Array.isArray(validateFn)
      ? !!validateFn.filter(fn => !fn.fn(value)).length
      : !validateFn.fn(value);

  const [hasErrors, setHasErrors] = useState(
    enableValidation ? isInvalid(value) : false
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (onChange) onChange(e);
    if (enableValidation) {
      const hasValidationError = isInvalid(inputValue);
      setHasErrors(hasValidationError);

      const validateFnName = Array.isArray(validateFn)
        ? validateFn.filter(fn => !fn.fn(inputValue)).map(fn => fn.name)
        : validateFn.name;

      if (onValidation)
        onValidation(
          hasValidationError
            ? Array.isArray(validateFnName)
              ? validateFnName.map(name =>
                  getValidationErrorText(name, router.locale)
                )
              : getValidationErrorText(validateFnName, router.locale)
            : ""
        ); // TODO set real error text
    }
  };
  return { handleChange };
}
