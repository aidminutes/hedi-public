import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError } from "@/modules/common/error";
import { isErrorThatCanBeHandled } from "@/modules/common/utils";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQTransitionMidwifeCareRequestResponse } from "../gqTypes";
import {
  TransitionConnectionInput,
  ITransitionMidwifeCareRequestResponse,
} from "../../types";

const transitionMidwifeCareRequestGQ = gql`
mutation transitionMidwifeCareRequest(
  $route: String!
  $transition: String!
  ) { ${withArgs(
    { transitionRequest: GQTransitionMidwifeCareRequestResponse },
    "transitionRequest",
    { route: "$route", transition: "$transition" }
  )}
}`;

export async function transitionMidwifeCareRequestMutation(
  input: TransitionConnectionInput,
  authHeader: IAuthHeader
): Promise<ITransitionMidwifeCareRequestResponse | IHTTPError> {
  return userGQuery<{
    transitionRequest: ITransitionMidwifeCareRequestResponse;
  }>(authHeader, transitionMidwifeCareRequestGQ, input).then(data => {
    if (isErrorThatCanBeHandled(data)) return data;
    if (
      Array.isArray(data.transitionRequest?.errors) &&
      !data.transitionRequest.errors.length
    ) {
      data.transitionRequest.errors = undefined;
    }
    return data.transitionRequest;
  });
}
