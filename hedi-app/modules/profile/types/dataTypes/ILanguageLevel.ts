import { ILanguage } from "@/modules/common/types/ILanguage";
import { IFluency } from "../taxonomyTypes";

export interface ILanguageLevel {
  language: ILanguage;
  fluency: IFluency;
}

export interface ILanguageLevelInput {
  language: string;
  fluency: number;
}

export const LanguageLevelInputDefault: ILanguageLevelInput = {
  language: "de",
  fluency: 0,
};

export function languageLevelToInput(
  languageLevel: ILanguageLevel
): ILanguageLevelInput {
  const {
    language: { route },
    fluency: { index },
  } = languageLevel;
  return { language: route, fluency: index };
}
