import { IEntityLocalized, IWithType } from "@/modules/model";

export interface IPageEntry extends IEntityLocalized, IWithType {
  id: string;
  description?: string;
}

export const isIPageEntry = (obj: any): obj is IPageEntry =>
  obj != null && obj?.type === "Page";
