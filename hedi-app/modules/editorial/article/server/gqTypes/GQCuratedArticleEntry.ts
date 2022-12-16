import { gqPick, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQICategoryEntry } from "@/modules/editorial/category/server/gqTypes/GQICategoryEntry";
import { ICuratedArticleEntry } from "../../types/ICuratedArticleEntry";
import { GQIArticleEntry } from "./GQIArticleEntry";

export const GQICuratedArticleEntry: ICuratedArticleEntry = {
  ...GQIArticleEntry,
  category: gqPick(GQICategoryEntry, ["image"]),
};
export const GQCuratedArticleEntry = withInlineFragment(
  GQICuratedArticleEntry,
  "Article"
);
