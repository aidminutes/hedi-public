import { IValidationFunction } from "@/modules/react/validation";
import { INumberInputProps } from "../client/components/NumberInput/transformNumberInput";

export interface IValidatedNumberInputProps extends INumberInputProps {
  validateFn?: IValidationFunction | IValidationFunction[];
  enableValidation?: Boolean;
  onValidation?: (textError: string | string[]) => void;
}
