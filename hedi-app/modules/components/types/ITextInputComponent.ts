import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type TextInputKind = "TextInput";

export interface ITextInputComponent extends IComponent {
  id: string;
  kind: TextInputKind;
  type: "text" | "email" | "password" | "number";
  labelText: HTML;
  isRequired?: boolean;
  placeholder?: string;
  helperText?: HTML;
  ariaLabel?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export const isTextInput = (obj: IComponent): obj is ITextInputComponent =>
  obj?.kind === "TextInput";

export const isTextInputInstance = (
  obj: IComponent,
  id: string
): obj is ITextInputComponent => isTextInput(obj) && obj.id === id;

export const findTextInputInstance = (array: IComponent[], id: string) =>
  findComponentInstance<ITextInputComponent>("TextInput", array, id);

export const getTextInputInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ITextInputComponent, "kind" | "id">
) => getComponentInstance("TextInput", array, id, fallback);
