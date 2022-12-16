import { SideNavProps } from "carbon-components-react/lib/components/UIShell/SideNav";
import { IMainMenuDefinition } from "../MainMenu/types";
import { IAccountMenuDefinition } from "../AccountMenu/types";
import { IFooterDefinition } from "../../Footer/types";
import { HeaderMenuButtonProps } from "carbon-components-react";
import { IBackToHome } from "../BackToHome/types";

export interface ISideMenuDefinition {
  backToHome?: IBackToHome;
  mainMenu?: IMainMenuDefinition;
  accountMenu?: IAccountMenuDefinition;
  footer?: IFooterDefinition;
}

export type ISideMenuPanel = ISideMenuDefinition & ISideMenuPanelConfig;

export interface ISideMenuPanelConfig extends SideNavProps {}

export type ISideMenuButton = HeaderMenuButtonProps;
