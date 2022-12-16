import { withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server/gqTypes/GQIEntityLocalized";

export const GQMidwifePaths = withArgs(
  { midwives: GQIEntityLocalized },
  "midwives",
  { lang: "$lang" }
);
