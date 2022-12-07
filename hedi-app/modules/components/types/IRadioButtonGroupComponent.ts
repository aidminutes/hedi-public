import { IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";
import { IRadioButtonComponent } from "./IRadioButtonComponent";

export type RadioButtonGroupKind = "RadioButtonGroup";

export interface IRadioButtonGroupComponent extends IComponent {
  id: string;
  kind: RadioButtonGroupKind;
  name: string;
  items: IRadioButtonComponent[];
}

export const isRadioButtonGroup = (
  obj: IComponent
): obj is IRadioButtonGroupComponent => obj?.kind === "RadioButtonGroup";

export const isRadioButtonGroupInstance = (
  obj: IComponent,
  id: string
): obj is IRadioButtonGroupComponent =>
  isRadioButtonGroup(obj) && obj.id === id;

export const findRadioButtonGroupInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IRadioButtonGroupComponent>(
    "RadioButtonGroup",
    array,
    id
  );

export const getRadioButtonGroupInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IRadioButtonGroupComponent, "kind" | "id">
) => getComponentInstance("RadioButtonGroup", array, id, fallback);
