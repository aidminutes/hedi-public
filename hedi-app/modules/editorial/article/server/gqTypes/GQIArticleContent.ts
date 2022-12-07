import { gqPick, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIArticle } from "./GQIArticle";
import { IArticleContent } from "../../types/IArticleContent";

export const GQIArticleContent: IArticleContent = withArgs(
  gqPick(GQIArticle, ["route", "label", "lang", "audio", "components"]),
  "components",
  { hrefLang: "$hrefLang" }
);
