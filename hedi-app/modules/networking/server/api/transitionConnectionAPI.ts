import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { transitionConnectionMutation } from "@/modules/networking/server/query";
import {
  TransitionConnectionInput,
  ITransitionConnectionResponse,
} from "@/modules/networking/types";

export const transitionConnectionAPI: NextApiHandler<ITransitionConnectionResponse> = async (
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
    input: TransitionConnectionInput;
    lang?: string;
  };
  const result = await transitionConnectionMutation(input, authHeader).catch(
    err => {
      console.warn(err);
      return null;
    }
  );
  sendAPIResult(res, result);
};
