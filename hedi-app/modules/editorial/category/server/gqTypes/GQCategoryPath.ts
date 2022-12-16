import { withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server";

export const GQCategoryPaths = withArgs(
  { categories: GQIEntityLocalized },
  "categories",
  { lang: "$lang" }
);
