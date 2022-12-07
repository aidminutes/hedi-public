import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type TextAreaKind = "TextArea";

export interface ITextAreaComponent extends IComponent {
  kind: TextAreaKind;
  labelText?: HTML;
  isRequired?: boolean;
  placeholder?: string;
  helperText?: HTML;
}

export const isTextArea = (obj: IComponent): obj is ITextAreaComponent =>
  obj?.kind === "TextArea";

export const isTextAreaInstance = (
  obj: IComponent,
  id: string
): obj is ITextAreaComponent => isTextArea(obj) && obj.id === id;

export const findTextAreaInstance = (array: IComponent[], id: string) =>
  findComponentInstance<ITextAreaComponent>("TextArea", array, id);

export const getTextAreaInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ITextAreaComponent, "kind" | "id">
) => getComponentInstance("TextArea", array, id, fallback);
