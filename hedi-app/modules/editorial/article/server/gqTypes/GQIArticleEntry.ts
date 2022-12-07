import { GQString, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import {
  GQIEntityLocalized,
  GQIWithType,
  GQITag,
} from "@/modules/model/server";
import { GQIWithAppStyle } from "../../../server/gqTypes/GQIWithAppStyle";
import { GQIWithRouteLabel } from "../../../server/gqTypes/GQIWithRouteLabel";
import { IArticleEntry } from "../../types";

export const GQIArticleEntry: IArticleEntry = {
  ...GQIWithType,
  ...GQIEntityLocalized,
  ...GQIWithAppStyle,
  ...GQIWithRouteLabel,
  summary: GQString,
  tags: [GQITag],
};

export const GQArticleEntry: IArticleEntry = withInlineFragment(
  GQIArticleEntry,
  "Article"
);
