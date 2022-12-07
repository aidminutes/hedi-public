import { IEntity, implementsIEntity } from "./IEntity";

export interface IEntityLocalized extends IEntity {
  lang: string;
}

export const implementsIEntityLocalized = (obj: any) =>
  implementsIEntity(obj) && !!obj.lang;

export function isILocalizedEntity(obj: any): obj is IEntityLocalized {
  return implementsIEntityLocalized(obj);
}
