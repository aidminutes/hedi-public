import {
  IEntityLocalized,
  implementsIEntityLocalized,
} from "./IEntityLocalized";
import { implementsIWithType, IWithType } from "./IWithType";

export interface IEntityTranslated extends IWithType, IEntityLocalized {
  translations: IEntityLocalized[];
}

export const implementsIEntityTranslated = (obj: any) =>
  implementsIWithType(obj) &&
  implementsIEntityLocalized(obj) &&
  obj.translations;

export function isIEntityTranslated(obj: any): obj is IEntityTranslated {
  return implementsIEntityTranslated(obj);
}
