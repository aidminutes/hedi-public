import { IEntityTranslated } from "@/modules/model";
import { IComponent } from "@/modules/components";
import { ICategory, ICategoryEntry } from "@/modules/editorial/category/types";
import {
  IArticleEntry,
  ICuratedArticleEntry,
} from "@/modules/editorial/article/types";

export type ITopics = {
  categories: (ICategoryEntry & Pick<ICategory, "parent" | "appStyle">)[];
  articles: IArticleEntry[];
  curatedArticles: ICuratedArticleEntry[];
};

export interface ITopicsView extends IEntityTranslated, ITopics {
  components: IComponent[];
}
