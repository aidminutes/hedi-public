import { logAndFallback } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withAlias, withArgs } from "@/modules/graphql/server/gq-ts";
import { IOrganisation, UserProfile } from "../../types";
import { GQUserProfile } from "../gqTypes/GQUserProfile";

type ProfileResponse = IOrganisation | UserProfile | null;

const getProfileDetailGQ = gql`
query getProfileDetail(
  $routes: [String!]!
  $lang: String!
) {
  ${withAlias(
    withArgs({ profiles: GQUserProfile }, "profiles", {
      routes: "$routes",
      lang: "$lang",
    }),
    "profiles",
    "entitiesTranslated"
  )}
  }
`;

export async function getProfileDetail(
  lang: string,
  routes: string[],
  authHeader: IAuthHeader
): Promise<ProfileResponse[]> {
  const profiles = userGQuery<{ profiles: ProfileResponse[] }>(
    authHeader,
    getProfileDetailGQ,
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
