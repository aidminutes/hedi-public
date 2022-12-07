import { ILanguage } from "@/modules/common/types/ILanguage";
import { ILocaleProviderConfig } from "./types";

export function getLocaleProviderConfig(
  lang: string = "de",
  languages: ILanguage[]
): ILocaleProviderConfig {
  const enabledLocaleInfos = languages.map(({ route, label, direction }) => ({
    locale: route,
    label,
    isRTL: direction === "rtl",
  }));
  return { lang, enabledLocaleInfos };
}
