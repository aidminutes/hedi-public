import { IArticle } from "./IArticle";

export type IArticleContent = Pick<
  IArticle,
  "route" | "label" | "lang" | "audio" | "components"
>;
