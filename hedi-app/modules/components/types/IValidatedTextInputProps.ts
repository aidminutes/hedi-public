import { IValidationFunction } from "@/modules/react/validation";
import { ITextInputProps } from "../client/components/TextInput/transformTextInput";

export interface IValidatedTextInputProps extends ITextInputProps {
  validateFn?: IValidationFunction | IValidationFunction[];
  enableValidation?: Boolean;
  onValidation?: (textError: string | string[]) => void;
}
