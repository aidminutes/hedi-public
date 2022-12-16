import { logAndNull } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, GQBoolean, GQScalar } from "@/modules/graphql/server/gq-ts";
import { IValidateResetPasswordRequest } from "../../types/IValidateResetPasswordRequest";
import { IValidateResetPasswordResponse } from "../../types/IValidateResetPasswordResponse";

const gqValidateResetPassResponse: IValidateResetPasswordResponse = {
  success: GQBoolean,
  errors: GQScalar(),
};

const validateResetPasswordMutationGQ = gql`
    mutation validateResetPassword(
      $input: ValidateResetPasswordInput! ,
      $lang: String
    ) {
        validateResetPassword(input: $input, lang:$lang) {
          ${gqValidateResetPassResponse}
        }
    }`;

export async function validateResetPasswordQuery(
  validateResetPassData: IValidateResetPasswordRequest
): Promise<IValidateResetPasswordResponse | null> {
  validateResetPassData.lang = validateResetPassData.lang ?? "de";
  const { token } = validateResetPassData;
  return serviceGQuery<{
    validateResetPassword: IValidateResetPasswordResponse;
    error?: any;
  }>(validateResetPasswordMutationGQ, {
    input: { token: token },
    lang: validateResetPassData.lang,
  }).then(data => logAndNull(data)?.validateResetPassword ?? null);
}
