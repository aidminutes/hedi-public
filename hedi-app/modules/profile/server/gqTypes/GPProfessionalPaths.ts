import { withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server/gqTypes/GQIEntityLocalized";

export const GQProfessionalPaths = withArgs(
  { professionals: GQIEntityLocalized },
  "professionals",
  { lang: "$lang" }
);
