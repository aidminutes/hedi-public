import { IEntity } from "@/modules/model";

// NOTE gql language type actually implements IEntityTranslated<ILanguage>
// since we don't (yet) use/need the translation of a language in the same codepath
// omitting the lang and translation fields to shorten data
export interface ILanguage extends IEntity {
  direction: string;
}

export function isILanguage(obj: any): obj is ILanguage {
  return obj && obj.type === "Language" && "direction" in obj;
}
