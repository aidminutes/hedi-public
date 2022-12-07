import { GQILanguage } from "@/modules/common/server/gqTypes/GQILanguage";
import { ILanguageLevel } from "../../types";
import { GQFluency } from "./GQProfileTaxonomyTypes";

export const GQILanguageLevel: ILanguageLevel = {
  language: GQILanguage,
  fluency: GQFluency,
};
