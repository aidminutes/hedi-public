import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError } from "@/modules/common/error";
import { isErrorThatCanBeHandled } from "@/modules/common/utils";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQTransitionConnectionResponse } from "../gqTypes";
import {
  ITransitionConnectionResponse,
  TransitionConnectionInput,
} from "../../types";

const transitionConnectionGQ = gql`
mutation transitionConnection(
  $route: String!
  $transition: String!
  ) { ${withArgs(
    { transitionConnection: GQTransitionConnectionResponse },
    "transitionConnection",
    { route: "$route", transition: "$transition" }
  )}
}`;

export async function transitionConnectionMutation(
  input: {
    input: TransitionConnectionInput;
    lang?: string;
  },
  authHeader: IAuthHeader
): Promise<ITransitionConnectionResponse | IHTTPError> {
  return userGQuery<{
    transitionConnection: ITransitionConnectionResponse;
  }>(authHeader, transitionConnectionGQ, input.input).then(data => {
    if (isErrorThatCanBeHandled(data)) return data;
    if (
      Array.isArray(data.transitionConnection?.errors) &&
      !data.transitionConnection.errors.length
    ) {
      data.transitionConnection.errors = undefined;
    }
    return data.transitionConnection;
  });
}
