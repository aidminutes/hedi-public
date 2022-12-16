import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQTransitionSysMessageResponse } from "../gqTypes/GQISysMessage";
import {
  TransitionSysMessageInput,
  ITransitionSysMessageResponse,
} from "../../types";

const transitionSysMessageGQ = withArgs(
  { transitionSysMessage: GQTransitionSysMessageResponse },
  "transitionSysMessage",
  { route: "$route", transition: "$transition", lang: "$lang" }
);

const transitionSysMessageMutation = gql`
mutation transitionConnection(
  $route: String!
  $transition: String!
  $lang: String
  ) { ${transitionSysMessageGQ}
}`;

export async function actionSysMessageMutation(
  args: {
    input: TransitionSysMessageInput;
    lang?: string;
  },
  authHeader: IAuthHeader
): Promise<ITransitionSysMessageResponse | IHTTPError> {
  const { input, lang } = args;

  return userGQuery<{
    transitionSysMessage: ITransitionSysMessageResponse;
  }>(authHeader, transitionSysMessageMutation, { ...input, lang }).then(
    data => {
      if (IsIHTTPError(data)) return data;
      if (
        Array.isArray(data.transitionSysMessage?.errors) &&
        !data.transitionSysMessage.errors.length
      ) {
        data.transitionSysMessage.errors = undefined;
      }
      return data.transitionSysMessage;
    }
  );
}
