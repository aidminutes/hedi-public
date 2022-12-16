import { Smoke16 } from "@carbon/icons-react";
import { IImageComponent, ISvgComponent } from "..";
import { HTML, IComponent } from "./IComponent";
import { IMenuComponent } from "./IMenuComponent";
import {
  findComponentInstance,
  findComponentKind,
  getComponentInstance,
  getComponentKind,
} from "./utils";

export type MenuHeaderKind = "Menuheader";

export interface IMenuHeaderComponent extends IComponent {
  kind: MenuHeaderKind;
  menuHeaderTitle: string;
  menuHeaderDescription: string;
  menuHeaderImage?: IImageComponent | ISvgComponent;
  onClick?: () => void;
}

export const isMenuHeader = (obj: IComponent): obj is IMenuHeaderComponent =>
  obj?.kind === "Menuheader";

export const isMenuHeaderInstance = (
  obj: IComponent
): obj is IMenuHeaderComponent => isMenuHeader(obj);

export const findMenuHeaderInstance = (array: IComponent[]) =>
  findComponentKind<IMenuHeaderComponent>("Menuheader", array);

export const getMenuHeaderInstance = (
  array: IComponent[],
  fallback: Omit<IMenuHeaderComponent, "kind">
) => getComponentKind("Menuheader", array, fallback);

export const findParentMenu = (
  menuItems: IComponent[],
  currentMenu: IMenuComponent
) => {
  const parentMenu = menuItems.filter(element => {
    if (element.kind == "Menu") {
      const foundElement = (element as IMenuComponent).components?.find(
        comp => comp === currentMenu
      );
      return !!foundElement;
    }
    return false;
  });
  if (parentMenu) return parentMenu[0] as IMenuComponent;
  return null;
};
