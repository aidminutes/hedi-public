import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IMutationResponse } from "@/modules/model";
import { GQIMutationResponse } from "@/modules/model/server/gqTypes";

const upsertProfileImageGQ = gql`
mutation upsertProfileImage(
  $imageRoute: String
  $route: String
  ) {
    ${withArgs(
      { upsertProfileImage: GQIMutationResponse },
      "upsertProfileImage",
      { imageRoute: "$imageRoute", route: "$route" }
    )}
}`;

export async function upsertProfileImageMutation(
  imageRoute: string,
  route: string,
  authHeader: IAuthHeader
): Promise<IMutationResponse | IHTTPError> {
  return userGQuery<{ upsertProfileImage: IMutationResponse }>(
    authHeader,
    upsertProfileImageGQ,
    { imageRoute, route }
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    return data.upsertProfileImage;
  });
}
