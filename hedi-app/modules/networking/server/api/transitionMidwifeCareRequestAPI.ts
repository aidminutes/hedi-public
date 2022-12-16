import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import {
  IActionMidwifeCareRequestInput,
  ITransitionMidwifeCareRequestResponse,
} from "@/modules/networking/types";
import { transitionMidwifeCareRequestMutation } from "@/modules/networking/server/query";

export const transitionMidwifeCareRequestAPI: NextApiHandler<ITransitionMidwifeCareRequestResponse> = async (
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

  const input = (req.body
    ? JSON.parse(req.body)
    : {}) as IActionMidwifeCareRequestInput;
  const result = await transitionMidwifeCareRequestMutation(
    input,
    authHeader
  ).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
