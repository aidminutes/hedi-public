import { Component } from "@/modules/components/types/IComponent";
import { GQICategoryEntry } from "../../../category/server/gqTypes/GQICategoryEntry";
import {
  GQScalar,
  GQString,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import { GQAudio } from "@/modules/media/server/gqTypes/GQMedia";
import { GQIEntityTranslated, GQITag } from "@/modules/model/server";
import { GQIWithAppStyle } from "../../../server/gqTypes/GQIWithAppStyle";
import { GQIWithRouteLabel } from "../../../server/gqTypes/GQIWithRouteLabel";
import { IArticle } from "../../types";
import { GQIArticleEntry } from "./GQIArticleEntry";

export const GQIArticle: IArticle = {
  ...GQIEntityTranslated,
  ...GQIArticleEntry,
  components: [GQScalar<Component>()],
  category: GQICategoryEntry,
  tags: [GQITag],
  audio: GQAudio,
};

export const GQArticle = withInlineFragment(GQIArticle, "Article");

export const GQIRecommendedArticle: Omit<
  IArticle,
  "components" | "relatedProfiles" | "tags" | "audio"
> = {
  ...GQIEntityTranslated,
  ...GQIWithAppStyle,
  ...GQIWithRouteLabel,
  summary: GQString,
  category: {
    ...GQICategoryEntry,
  },
};

export const GQRecommendedArticle = withInlineFragment(
  GQIRecommendedArticle,
  "Article"
);
