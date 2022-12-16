import { logAndNull } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, GQBoolean, GQScalar } from "@/modules/graphql/server/gq-ts";
import { IRegisterInfo, IRegisterResponse } from "../../types";

const gqRegisterResponse: IRegisterResponse = {
  success: GQBoolean,
  errors: GQScalar(),
};

const registerMutationGQ = gql`
    mutation register($input: RegisterInput!, $lang: String, $commit: Boolean) {
      register(input: $input, lang: $lang, commit: $commit) {
        ${gqRegisterResponse}
      }
    }
  `;

export async function registerQuery(
  input: IRegisterInfo,
  lang?: string,
  commit?: boolean
): Promise<IRegisterResponse | null> {
  lang = lang ?? "de";
  return serviceGQuery<{ register: IRegisterResponse; error?: any }>(
    registerMutationGQ,
    { input, lang, commit }
  ).then(data => logAndNull(data)?.register ?? null);
}
