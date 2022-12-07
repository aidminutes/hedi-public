import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type MenuKind = "Menu";

export interface IMenuComponent extends IComponent {
  kind: MenuKind;
  href?: string;
  renderIcon?: string;
  iconDescription?: string;
  labelText?: HTML;
  usage?: string;
  components?: IComponent[];
  onClick?: () => void;
}

export const isMenu = (obj: IComponent): obj is IMenuComponent =>
  obj?.kind === "Menu";

export const isMenuInstance = (
  obj: IComponent,
  id: string
): obj is IMenuComponent => isMenu(obj) && obj.id === id;

export const findMenuInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IMenuComponent>("Menu", array, id);

export const getMenuInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IMenuComponent, "kind" | "id">
) => getComponentInstance("Menu", array, id, fallback);
