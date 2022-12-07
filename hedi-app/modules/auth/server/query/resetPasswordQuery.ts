import { logAndNull } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, GQBoolean, GQScalar } from "@/modules/graphql/server/gq-ts";
import { IResetPasswordRequest } from "../../types/IResetPasswordRequest";
import { IResetPasswordResponse } from "../../types/IResetPasswordResponse";

const gqResetPassResponse: IResetPasswordResponse = {
  success: GQBoolean,
  errors: GQScalar(),
};

const resetPasswordMutationGQ = gql`
    mutation resetPassword(
      $input: ResetPasswordInput! ,
      $lang: String
    ) {
        resetPassword(input: $input, lang:$lang) {
          ${gqResetPassResponse}
        }
    }`;

export async function resetPasswordQuery(
  resetPassData: IResetPasswordRequest
): Promise<IResetPasswordResponse | null> {
  resetPassData.lang = resetPassData.lang ?? "de";
  const { token, password } = resetPassData;
  return serviceGQuery<{ resetPassword: IResetPasswordResponse; error?: any }>(
    resetPasswordMutationGQ,
    { input: { token, password }, lang: resetPassData.lang }
  ).then(data => logAndNull(data)?.resetPassword ?? null);
}
