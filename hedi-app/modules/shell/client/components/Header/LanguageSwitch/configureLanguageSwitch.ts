import { IEntityTranslated } from "@/modules/model";
import { ILanguageSwitchDefinition } from "./types";

export function configureLanguageSwitch(
  languageSwitch: ILanguageSwitchDefinition,
  translatable: Pick<IEntityTranslated, "lang" | "translations">
): ILanguageSwitchDefinition {
  const { options, ...rest } = languageSwitch;
  const transformed = translatable.translations
    .map(t => {
      const option = options.find(opt => opt.lang === t.lang);
      return {
        labelText: option?.labelText ?? t.lang,
        href: t.route,
        lang: t.lang,
      };
    })
    .filter(opt => opt.lang !== translatable.lang)
    .sort((a, b) => a.labelText.localeCompare(b.labelText));
  return {
    options: transformed,
    ...rest,
  };
}
