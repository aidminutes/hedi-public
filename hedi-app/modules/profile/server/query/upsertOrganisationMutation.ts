import { IHTTPError } from "@/modules/common/error";
import { isErrorThatCanBeHandled } from "@/modules/common/utils";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IOrganisationInput, IUpsertOrganisationResponse } from "../../types";
import { GQUpsertOrganisationResponse } from "../gqTypes/GQOrganisation";

const upsertOrganisationGQ = gql`
mutation upsertOrganisation(
  $input: OrganisationInput 
  $route: String
  $lang: String
  ) {
    ${withArgs(
      { upsertOrganisation: GQUpsertOrganisationResponse },
      "upsertOrganisation",
      { input: "$input", route: "$route", lang: "$lang" }
    )}
}`;

export async function upsertOrganisationMutation(
  input: {
    input?: IOrganisationInput;
    route?: string;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertOrganisationResponse | IHTTPError> {
  return userGQuery<{ upsertOrganisation: IUpsertOrganisationResponse }>(
    authHeader,
    upsertOrganisationGQ,
    input
  ).then(data => {
    if (isErrorThatCanBeHandled(data)) return data;
    if (
      Array.isArray(data.upsertOrganisation?.errors) &&
      !data.upsertOrganisation.errors.length
    ) {
      data.upsertOrganisation.errors = undefined;
    }
    return data.upsertOrganisation;
  });
}
