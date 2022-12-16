import { IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type RadioButtonKind = "RadioButton";

export interface IRadioButtonComponent {
  id: string;
  kind: RadioButtonKind;
  labelText: string;
  value: string;
}

export const isRadioButton = (obj: IComponent): obj is IRadioButtonComponent =>
  obj?.kind === "RadioButton";

export const isRadioButtonInstance = (
  obj: IComponent,
  id: string
): obj is IRadioButtonComponent => isRadioButton(obj) && obj.id === id;

export const findRadioButtonInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IRadioButtonComponent>("RadioButton", array, id);

export const getRadioButtonInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IRadioButtonComponent, "kind" | "id">
) => getComponentInstance("RadioButton", array, id, fallback);
