import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IMidwifeInput, IUpsertMidwifeResponse } from "../../types";
import { GQUpsertMidwifeResponse } from "../gqTypes/GQMidwife";

export const upsertMyMidwifeProfileGQ = gql`
mutation upsertMidwife(
  $input: MidwifeInput 
  $lang: String
  ) {
    ${withArgs(
      { upsertMyMidwifeProfile: GQUpsertMidwifeResponse },
      "upsertMyMidwifeProfile",
      { input: "$input", lang: "$lang" }
    )}
}`;

export async function upsertMyMidwifeProfileMutation(
  input: {
    input?: IMidwifeInput;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertMidwifeResponse | IHTTPError> {
  return userGQuery<{ upsertMyMidwifeProfile: IUpsertMidwifeResponse }>(
    authHeader,
    upsertMyMidwifeProfileGQ,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertMyMidwifeProfile?.errors) &&
      !data.upsertMyMidwifeProfile.errors.length
    ) {
      data.upsertMyMidwifeProfile.errors = undefined;
    }
    return data.upsertMyMidwifeProfile;
  });
}
