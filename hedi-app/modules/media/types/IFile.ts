import { IEntityLocalized, implementsIEntityLocalized } from "@/modules/model";

export interface IFile extends IEntityLocalized {
  mime: string;
}

export const implementsIFile = (obj: any) =>
  implementsIEntityLocalized(obj) && !!obj.mime;

export function isIFile(obj: any): obj is IFile {
  return implementsIFile(obj);
}
