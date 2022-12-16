import { IEntityTranslated } from "@/modules/model";
import { IWithAppStyle, IWithRouteLabel } from "../../types";
import { IArticleEntry } from "../../article/types";
import { ICategoryEntry } from "./ICategoryEntry";

export interface ICategory
  extends ICategoryEntry,
    IEntityTranslated,
    IWithAppStyle,
    IWithRouteLabel {
  parent: number;
  articles: IArticleEntry[];
  categories: ICategoryEntry[];
}

export function isICategory(obj: any): obj is ICategory {
  return obj && obj.type === "Category";
}
