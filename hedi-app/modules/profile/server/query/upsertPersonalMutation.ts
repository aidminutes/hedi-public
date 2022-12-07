import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IPersonalInput, IUpsertPersonalResponse } from "../../types";
import { GQUpsertPersonalResponse } from "../gqTypes/GQPersonal";

const upsertPersonalGQ = gql`
mutation upsertPersonal(
  $input: PersonalInput 
  $lang: String
  ) {
    ${withArgs({ upsertPersonal: GQUpsertPersonalResponse }, "upsertPersonal", {
      input: "$input",
      lang: "$lang",
    })}
}`;

export async function upsertPersonalMutation(
  input: {
    input?: IPersonalInput;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertPersonalResponse | IHTTPError> {
  return userGQuery<{ upsertPersonal: IUpsertPersonalResponse }>(
    authHeader,
    upsertPersonalGQ,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertPersonal?.errors) &&
      !data.upsertPersonal.errors.length
    ) {
      data.upsertPersonal.errors = undefined;
    }
    return data.upsertPersonal;
  });
}
