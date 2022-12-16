import { IEntityTranslated } from "./IEntityTranslated";

// defined to be overwritten later
export interface ITag extends IEntityTranslated {}

export type TagType =
  | "red"
  | "magenta"
  | "purple"
  | "blue"
  | "cyan"
  | "teal"
  | "green"
  | "gray"
  | "cool-gray"
  | "warm-gray"
  | "high-contrast";

export interface IWithTags {
  tags: ITag[];
}

export const implementsIWithTags = (obj: any) => !!(obj && obj.tags);

export function isIWithTags(obj: any): obj is IWithTags {
  return implementsIWithTags(obj);
}
