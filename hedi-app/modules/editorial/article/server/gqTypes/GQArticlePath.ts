import { withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server";

export const GQArticlePaths = withArgs(
  { articles: GQIEntityLocalized },
  "articles",
  { lang: "$lang" }
);
