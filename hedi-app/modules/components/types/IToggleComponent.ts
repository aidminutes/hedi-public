import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type ToggleKind = "Toggle";

export interface IToggleComponent extends IComponent {
  id: string;
  kind: ToggleKind;
  labelText: HTML;
  labelA?: HTML;
  labelB?: HTML;
  ariaLabel?: string;
}

export const isToggle = (obj: IComponent): obj is IToggleComponent =>
  obj?.kind === "Toggle";

export const isToggleInstance = (
  obj: IComponent,
  id: string
): obj is IToggleComponent => isToggle(obj) && obj.id === id;

export const findToggleInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IToggleComponent>("Toggle", array, id);

export const getToggleInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IToggleComponent, "kind" | "id">
) => getComponentInstance("Toggle", array, id, fallback);
