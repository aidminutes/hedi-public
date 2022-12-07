import { GQIArticleEntry } from "../../../article/server/gqTypes/GQIArticleEntry";
import { GQNumber, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQIEntityTranslated } from "@/modules/model/server";
import { GQIWithAppStyle } from "../../../server/gqTypes/GQIWithAppStyle";
import { GQIWithRouteLabel } from "../../../server/gqTypes/GQIWithRouteLabel";
import { ICategory } from "../../types";
import { GQICategoryEntry } from "./GQICategoryEntry";

export const GQICategory: ICategory = {
  ...GQIEntityTranslated,
  ...GQICategoryEntry,
  ...GQIWithAppStyle,
  ...GQIWithRouteLabel,
  parent: GQNumber,
  articles: [GQIArticleEntry],
  categories: [GQICategoryEntry],
};

export const GQCategory = withInlineFragment(GQICategory, "Category");
