import { ICategoryEntry } from "../../category/types/ICategoryEntry";
import { IArticleEntry } from "./IArticleEntry";

export type ICuratedArticleEntry = IArticleEntry & {
  category: Pick<ICategoryEntry, "image">;
};
export interface ICuratedArticleProps {
  article: ICuratedArticleEntry;
}

export interface ICuratedArticleListProps {
  articles: ICuratedArticleEntry[];
  headline?: string;
}
