import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { actionSysMessageMutation } from "./query";
import {
  TransitionSysMessageInput,
  ITransitionSysMessageResponse,
} from "../types";

export const transitionSysMessageAPI: NextApiHandler<ITransitionSysMessageResponse> = async (
  req,
  res
) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const input = (req.body ? JSON.parse(req.body) : {}) as {
    input: TransitionSysMessageInput;
    lang?: string;
  };
  const result = await actionSysMessageMutation(input, authHeader).catch(
    err => {
      console.warn(err);
      return null;
    }
  );
  sendAPIResult(res, result);
};
