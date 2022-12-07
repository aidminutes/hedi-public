import { withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server";

export const GQPagePaths = withArgs(
  { renderPages: GQIEntityLocalized },
  "renderPages",
  { lang: "$lang" }
);
