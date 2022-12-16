import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IProfessionalInput, IUpsertProfessionalResponse } from "../../types";
import { GQUpsertProfessionalResponse } from "../gqTypes/GQProfessional";

export const upsertProfessionalGQ = gql`
mutation upsertProfessional(
  $input: ProfessionalInput 
  $lang: String
  ) {
    ${withArgs(
      { upsertProfessional: GQUpsertProfessionalResponse },
      "upsertProfessional",
      { input: "$input", lang: "$lang" }
    )}
}`;

export async function upsertProfessionalMutation(
  input: {
    input?: IProfessionalInput;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertProfessionalResponse | IHTTPError> {
  return userGQuery<{ upsertProfessional: IUpsertProfessionalResponse }>(
    authHeader,
    upsertProfessionalGQ,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertProfessional?.errors) &&
      !data.upsertProfessional.errors.length
    ) {
      data.upsertProfessional.errors = undefined;
    }
    return data.upsertProfessional;
  });
}
