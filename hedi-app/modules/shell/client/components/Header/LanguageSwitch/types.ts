import { RequiredBy } from "@/modules/common/utils/typing";
import { IMenuComponent } from "@/modules/components";
import {
  HeaderGlobalActionProps,
  HeaderPanelProps,
} from "carbon-components-react";

export type ILanguageSwitch = ILanguageSwitchDefinition;

export type ILanguageSwitchDefinition = ILanguageSwitchActionDefinition &
  ILanguageSwitchPanelDefinition;

export type ILanguageSwitchAction = ILanguageSwitchActionDefinition &
  HeaderGlobalActionProps;

export type ILanguageSwitchActionDefinition = Pick<
  IMenuComponent,
  "renderIcon" | "iconDescription" | "labelText"
>;

export type ILanguageSwitchPanel = ILanguageSwitchPanelDefinition &
  HeaderPanelProps & {
    closeLanguageSwitch: () => void;
  };

export interface ILanguageSwitchPanelDefinition {
  options: ILanguageSwitchOption[];
}

export interface ILanguageSwitchOption
  extends Omit<RequiredBy<IMenuComponent, "labelText">, "id" | "kind"> {
  lang: string;
}
