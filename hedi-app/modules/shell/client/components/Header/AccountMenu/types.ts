import {
  HeaderGlobalActionProps,
  HeaderPanelProps,
} from "carbon-components-react";
import { IComponent, IMenuComponent } from "@/modules/components";

export type IAccountMenu = IAccountMenuDefinition;

export interface IAccountMenuDefinition extends IMenuComponent {
  id?: "account";
  components: IComponent[];
}

export type IAccountMenuAction = IAccountMenuActionDefinition &
  IAccountMenuActionConfig;

export type IAccountMenuActionDefinition = Pick<
  IAccountMenuDefinition,
  "renderIcon" | "iconDescription" | "labelText"
>;

export type IAccountMenuActionConfig = Pick<IAccountMenuDefinition, "href"> &
  Omit<HeaderGlobalActionProps, "href">;

export type IAccountMenuPanel = IAccountMenuPanelDefinition &
  IAccountMenuPanelConfig;

export type IAccountMenuPanelDefinition = Pick<
  IAccountMenuDefinition,
  "iconDescription" | "labelText" | "components"
>;

export type IAccountMenuPanelConfig = HeaderPanelProps;
