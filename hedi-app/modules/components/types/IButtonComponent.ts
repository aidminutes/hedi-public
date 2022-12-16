import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type ButtonKind = "Button";

export interface IButtonComponent extends IComponent {
  kind: ButtonKind;
  type?: "button" | "submit" | "reset";
  buttonKind: string;
  href?: string;
  usage: string;
  text?: HTML;
  renderIcon?: string;
  iconDescription?: string;
  labelText?: HTML;
  ariaLabel?: string;
}

export const isButton = (obj: IComponent): obj is IButtonComponent =>
  obj?.kind === "Button";

export const isButtonInstance = (
  obj: IComponent,
  id: string
): obj is IButtonComponent => isButton(obj) && obj.id === id;

export const findButtonInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IButtonComponent>("Button", array, id);

export const getButtonInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IButtonComponent, "kind" | "id">
) => getComponentInstance("Button", array, id, fallback);
