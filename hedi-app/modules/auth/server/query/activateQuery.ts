import { logAndNull } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, GQBoolean, GQScalar } from "@/modules/graphql/server/gq-ts";
import { IActivateRequest, IActivateResponse } from "../../types";

const gqActivateResponse: IActivateResponse = {
  success: GQBoolean,
  errors: GQScalar(),
};

const activateMutationGQ = gql`
    mutation activate(
      $input: ActivateUserInput!
      $lang: String
    ) {
        activateUser(input: $input, lang:$lang) {
          ${gqActivateResponse}
        }
    }`;

export async function activateQuery(
  activateData: IActivateRequest
): Promise<IActivateResponse | null> {
  activateData.lang = activateData.lang ?? "de";
  const { token } = activateData;
  return serviceGQuery<{ activateUser: IActivateResponse; error?: any }>(
    activateMutationGQ,
    { input: { token }, lang: activateData.lang }
  ).then(data => logAndNull(data)?.activateUser ?? null);
}
