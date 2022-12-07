import { IEntityTranslated } from "@/modules/model";
import {
  IShellDefinitionConfig,
  IShellDefinition,
} from "@/modules/shell/types";
import { configureLanguageSwitch } from "../Header/LanguageSwitch/configureLanguageSwitch";

export function configureShellDefinition(
  shell: IShellDefinition,
  config: IShellDefinitionConfig,
  translatable: Pick<IEntityTranslated, "lang" | "translations">
): IShellDefinition {
  const { accountMenu, languageSwitch, scrollToTop, ...rest } = shell;
  return {
    accountMenu: config.hideAccountMenu ? undefined : accountMenu,
    languageSwitch: configureLanguageSwitch(languageSwitch, translatable),
    scrollToTop: config.hideScrollToTop ? undefined : scrollToTop,
    ...rest,
  };
}
