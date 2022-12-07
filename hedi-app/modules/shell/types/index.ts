import { IWithAppStyle } from "@/modules/editorial/types";
import { ILocaleProviderConfig } from "../client/contexts/LocaleContext/types";
import { IBackToHomeDefinition } from "../client/components/Header/BackToHome/types";
import { IMainMenuDefinition } from "../client/components/Header/MainMenu/types";
import { IAccountMenuDefinition } from "../client/components/Header/AccountMenu/types";
import { ILanguageSwitchDefinition } from "../client/components/Header/LanguageSwitch/types";
import { IFooterDefinition } from "../client/components/Footer/types";
import { IScrollToTopDefinition } from "../client/components/ScrollToTop/types";
import { ILayout } from "../client/components/Layout/types/ILayout";
import { IComponent, IGroupComponent } from "@/modules/components";

export interface IShell extends IShellDefinition, IShellConfig {
  label: string;
}
export interface IShellDefinition {
  localeProvider: ILocaleProviderConfig;
  backToHome: IBackToHomeDefinition;
  mainMenu?: IMainMenuDefinition;
  accountMenu?: IAccountMenuDefinition;
  languageSwitch: ILanguageSwitchDefinition;
  scrollToTop?: IScrollToTopDefinition;
  footer?: IFooterDefinition;
  commonComponents: IComponent[];
}

export interface IShellDefinitionConfig {
  hideAccountMenu?: boolean;
  // TODO not yet possible, clientside dependencies need to be resolved first
  // hideHeader?: boolean;
  hideScrollToTop?: boolean;
  // hideFooter?: boolean;
}

export interface IMetaInfo {
  indexing: boolean;
  description?: string;
}

export interface IShellConfig extends Partial<IWithAppStyle> {
  redirectUnAuthorized?: string; // HACK
  revalidate?: boolean | number;
  layout?: ILayout;
  hideHeader?: boolean;
  hideFooter?: boolean;
  meta?: IMetaInfo;
}

export type IPageConfig = IShellDefinitionConfig & IShellConfig;

export interface IPageProps<T> {
  content: T;
  shell: IShell;
}
