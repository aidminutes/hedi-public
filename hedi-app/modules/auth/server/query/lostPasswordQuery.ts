import { logAndNull } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, GQBoolean, GQScalar } from "@/modules/graphql/server/gq-ts";
import {
  IResetPasswordSendEmailRequest,
  IResetPasswordSendEmailResponse,
} from "../../types";

const gqLostPasswordResponse: IResetPasswordSendEmailResponse = {
  success: GQBoolean,
  errors: GQScalar(),
};

const lostPasswordMutationGQ = gql`
    mutation lostPassword(
      $input: LostPasswordInput! , 
      $lang: String
    ) {
      lostPassword(input:$input, lang:$lang) {
        ${gqLostPasswordResponse}
      }
    }
  `;

export async function lostPasswordQuery(
  lostPasswordData: IResetPasswordSendEmailRequest
): Promise<IResetPasswordSendEmailResponse | null> {
  const { lang, ...input } = lostPasswordData;
  return serviceGQuery<{
    lostPassword: IResetPasswordSendEmailResponse;
    error?: any;
  }>(lostPasswordMutationGQ, { input, lang }).then(
    data => logAndNull(data)?.lostPassword ?? null
  );
}
