import { IWithAppStyle } from "@/modules/editorial/types/IWithAppStyle";
import { IBackToHomeDefinition } from "./BackToHome/types";
import { IMainMenuDefinition } from "./MainMenu/types";
import { IAccountMenuDefinition } from "./AccountMenu/types";
import { ILanguageSwitchDefinition } from "./LanguageSwitch/types";
import { IFooterDefinition } from "../Footer/types";

export type IHeader = IHeaderDefinition & IHeaderConfig;

export interface IHeaderDefinition {
  backToHome?: IBackToHomeDefinition;
  mainMenu?: IMainMenuDefinition;
  accountMenu?: IAccountMenuDefinition;
  languageSwitch?: ILanguageSwitchDefinition;
  footer?: IFooterDefinition;
}

export interface IHeaderConfig extends Partial<IWithAppStyle> {
  lang?: string;
}
