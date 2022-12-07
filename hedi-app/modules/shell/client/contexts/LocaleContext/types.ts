import { ILanguage } from "@/modules/common/types/ILanguage";

export interface ILocaleInfo extends Pick<ILanguage, "label"> {
  locale: string;
  isRTL: boolean;
}

export interface ILocaleProviderConfig {
  lang: string;
  enabledLocaleInfos: ILocaleInfo[];
}
