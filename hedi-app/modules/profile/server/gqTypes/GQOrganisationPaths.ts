import { withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server/gqTypes/GQIEntityLocalized";

export const GQOrganisationPaths = withArgs(
  { organisations: GQIEntityLocalized },
  "organisations",
  { lang: "$lang" }
);
