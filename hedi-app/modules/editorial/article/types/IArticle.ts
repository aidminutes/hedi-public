import { IEntityTranslated, ITag } from "@/modules/model";
import { IComponent } from "@/modules/components/types";
import { IAudio } from "@/modules/media/types";

import { IWithAppStyle, IWithRouteLabel } from "../../types";
import { ICategoryEntry } from "../../category/types/ICategoryEntry";
import { IArticleEntry } from "./IArticleEntry";

export interface IArticle
  extends IArticleEntry,
    IEntityTranslated,
    IWithAppStyle,
    IWithRouteLabel {
  category: ICategoryEntry;
  components: IComponent[];
  tags: ITag[];
  audio: IAudio | null;
}

export function isIArticle(obj: any): obj is IArticle {
  return obj && obj?.type === "Article";
}
