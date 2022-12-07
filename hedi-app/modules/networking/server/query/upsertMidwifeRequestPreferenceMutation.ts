import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQUpsertMidwifeRequestPreferenceResponse } from "../gqTypes";
import {
  IMidwifeRequestPreferenceInput,
  IUpsertMidwifeRequestPreferenceResponse,
} from "../../types";

const upsertMidwifeRequestPreferenceGQ = gql`
mutation upsertMidwifeRequestPreference(
  $input: MidwifeRequestPreferenceInput
  $route: String
  $lang: String
  ) { ${withArgs(
    {
      upsertMidwifeRequestPreference: GQUpsertMidwifeRequestPreferenceResponse,
    },
    "upsertMidwifeRequestPreference",
    { input: "$input", route: "$route", lang: "$lang" }
  )}
}`;

export async function upsertMidwifeRequestPreferenceMutation(
  input: {
    input?: IMidwifeRequestPreferenceInput;
    route?: string;
    lang?: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertMidwifeRequestPreferenceResponse | IHTTPError> {
  return userGQuery<{
    upsertMidwifeRequestPreference: IUpsertMidwifeRequestPreferenceResponse;
  }>(authHeader, upsertMidwifeRequestPreferenceGQ, input).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertMidwifeRequestPreference?.errors) &&
      !data.upsertMidwifeRequestPreference.errors.length
    ) {
      data.upsertMidwifeRequestPreference.errors = undefined;
    }
    return data.upsertMidwifeRequestPreference;
  });
}
