import { logAndFallback } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withAlias, withArgs } from "@/modules/graphql/server/gq-ts";
import { IOrganisation, IProfessional } from "../../types";
import { GQProfessional } from "../gqTypes/GQProfessional";
import { GQMidwife } from "../gqTypes/GQMidwife";
import { GQOrganisation } from "../gqTypes/GQOrganisation";

type ProfileResponse = IOrganisation | IProfessional | null;

const getProfilePublicDetailsGQ = gql`
query getProfilePublicDetails(
  $routes: [String!]!
  $lang: String!
) {
  ${withAlias(
    withArgs({ profiles: [GQProfessional] }, "profiles", {
      lang: "$lang",
      routes: "$routes",
    }),
    "profiles",
    "entitiesTranslated"
  )}
  ${withAlias(
    withArgs({ profiles: [GQOrganisation] }, "profiles", {
      lang: "$lang",
      routes: "$routes",
    }),
    "profiles",
    "entitiesTranslated"
  )}
  ${withAlias(
    withArgs({ profiles: [GQMidwife] }, "profiles", {
      lang: "$lang",
      routes: "$routes",
    }),
    "profiles",
    "entitiesTranslated"
  )}
  }
`;

export async function getProfilePublicDetails(
  lang: string,
  routes: string[]
): Promise<ProfileResponse[]> {
  const profiles = serviceGQuery<{ profiles: ProfileResponse[] }>(
    getProfilePublicDetailsGQ,
    {
      routes,
      lang,
    }
  ).then(
    data =>
      logAndFallback(data, { profiles: Array<ProfileResponse>() })?.profiles
  );

  return profiles;
}
