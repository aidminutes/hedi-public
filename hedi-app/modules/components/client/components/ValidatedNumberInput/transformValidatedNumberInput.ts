import { IValidatedNumberInputProps } from "../../../types";
import { requiredValidationFn } from "@/modules/react/validation";

export function transformValidatedNumberInput(
  props: IValidatedNumberInputProps
) {
  const {
    onChange,
    onValidation,
    enableValidation,
    validateFn,
    ...rest
  } = props;

  const validateFunction = validateFn || requiredValidationFn();
  const setDefaultEnableValidation = enableValidation ?? true;
  const value = rest.value || "";

  return {
    onChange,
    onValidation,
    value,
    validateFunction,
    setDefaultEnableValidation,
    ...rest,
  };
}
