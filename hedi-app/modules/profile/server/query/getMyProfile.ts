import { logAndFallback } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { UserProfile } from "../../types";
import { GQUserProfile } from "../gqTypes/GQUserProfile";

type MyProfileResponse = { myProfile: UserProfile | null };

const getMyProfileGQ = gql`
query getMyProfile(
  $lang: String!
) {
  ${withArgs({ myProfile: GQUserProfile }, "myProfile", { lang: "$lang" })}
}
`;

export async function getMyProfile(
  lang: string,
  authHeader: IAuthHeader
): Promise<UserProfile | null> {
  const { myProfile } = await userGQuery<MyProfileResponse>(
    authHeader,
    getMyProfileGQ,
    {
      lang,
    }
  ).then(data =>
    logAndFallback(data, { myProfile: null } as MyProfileResponse)
  );

  return myProfile;
}
