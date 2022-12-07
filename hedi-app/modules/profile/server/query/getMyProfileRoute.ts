import { logAndFallback } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, gqPick, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIProfile } from "../gqTypes/GQIProfile";

type MyProfileRouteResponse = { myProfile: { route: string } | null };

const getMyProfileRouteGQ = gql`
query getMyProfileRoute(
  $lang: String!
) {
  ${withArgs({ myProfile: gqPick(GQIProfile, ["route"]) }, "myProfile", {
    lang: "$lang",
  })}
}
`;

export async function getMyProfileRoute(
  lang: string,
  authHeader: IAuthHeader
): Promise<string | null> {
  const { myProfile } = await userGQuery<MyProfileRouteResponse>(
    authHeader,
    getMyProfileRouteGQ,
    { lang }
  ).then(data =>
    logAndFallback(data, {
      myProfile: null,
    } as MyProfileRouteResponse)
  );

  return myProfile?.route ?? null;
}
