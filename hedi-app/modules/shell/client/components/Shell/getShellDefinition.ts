import { ILanguage } from "@/modules/common/types";
import { getGroupInstance, IComponent } from "@/modules/components";
import { IShellDefinition } from "@/modules/shell/types";
import { getLocaleProviderConfig } from "../../contexts/LocaleContext/getLocaleProviderConfig";
import { getFooterDefinition } from "../Footer/getFooterDefinition";
import { getAccountMenuDefinition } from "../Header/AccountMenu/getAccountMenuDefinition";
import { getBackToHomeDefinition } from "../Header/BackToHome/getBackToHomeDefinition";
import { getLanguageSwitchDefinition } from "../Header/LanguageSwitch/getLanguageSwitchDefinition";
import { getMainMenuDefinition } from "../Header/MainMenu/getMainMenuDefinition";
import { getScrollToTopDefinition } from "../ScrollToTop/getScrollToTopDefinition";

export function getShellDefinition(
  components: IComponent[],
  languages: ILanguage[],
  lang: string
): IShellDefinition {
  return {
    localeProvider: getLocaleProviderConfig(lang, languages),
    backToHome: getBackToHomeDefinition(components),
    mainMenu: getMainMenuDefinition(components),
    accountMenu: getAccountMenuDefinition(components),
    languageSwitch: getLanguageSwitchDefinition(languages, components),
    scrollToTop: getScrollToTopDefinition(components),
    footer: getFooterDefinition(components),
    commonComponents: getGroupInstance(components, "commonComponents", {
      usage: "",
      components: [],
    }).components,
  };
}
