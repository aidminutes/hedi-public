import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IPregnancyInput, IUpsertPregnancyResponse } from "../../types";
import { GQUpsertPregnancyResponse } from "../gqTypes/GQPregnancy";

const upsertPregnancyGQ = gql`
  mutation upsertPregnancy(
    $input: PregnancyInput 
    $route: String
    $lang: String
  ) {
    ${withArgs(
      { upsertPregnancy: GQUpsertPregnancyResponse },
      "upsertPregnancy",
      { input: "$input", route: "$route", lang: "$lang" }
    )}
  }`;

export async function upsertPregnancyMutation(
  input: {
    input?: IPregnancyInput;
    route?: string;
    lang?: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertPregnancyResponse | IHTTPError> {
  return userGQuery<{ upsertPregnancy: IUpsertPregnancyResponse }>(
    authHeader,
    upsertPregnancyGQ,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertPregnancy?.errors) &&
      !data.upsertPregnancy.errors.length
    ) {
      data.upsertPregnancy.errors = undefined;
    }
    return data.upsertPregnancy;
  });
}
