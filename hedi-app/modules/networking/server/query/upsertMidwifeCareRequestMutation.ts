import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError } from "@/modules/common/error";
import { isErrorThatCanBeHandled } from "@/modules/common/utils";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQTransitionMidwifeCareRequestResponse } from "../gqTypes";
import {
  IUpsertMidwifeCareRequestInput,
  IUpsertMidwifeCareRequestResponse,
} from "../../types";

const upsertMidwifeCareRequestGQ = gql`
mutation upsertMidwifeCareRequest(
  $input: MidwifeCareRequestInput!
  $lang: String
  ) { ${withArgs(
    { upsertMidwifeCareRequest: GQTransitionMidwifeCareRequestResponse },
    "upsertMidwifeCareRequest",
    { input: "$input", lang: "$lang" }
  )}
}`;

export async function upsertMidwifeCareRequestMutation(
  input: {
    input?: IUpsertMidwifeCareRequestInput;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertMidwifeCareRequestResponse | IHTTPError> {
  return userGQuery<{
    upsertMidwifeCareRequest: IUpsertMidwifeCareRequestResponse;
  }>(authHeader, upsertMidwifeCareRequestGQ, input).then(data => {
    if (isErrorThatCanBeHandled(data)) return data;
    if (
      Array.isArray(data.upsertMidwifeCareRequest?.errors) &&
      !data.upsertMidwifeCareRequest.errors.length
    ) {
      data.upsertMidwifeCareRequest.errors = undefined;
    }
    return data.upsertMidwifeCareRequest;
  });
}
