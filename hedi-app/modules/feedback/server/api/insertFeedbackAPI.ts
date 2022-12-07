import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertFeedback } from "../query/insertFeedback";
import { IFeedbackInput } from "../../types";

export const insertFeedbacksAPI: NextApiHandler<IMutationResponse> = async (
  req,
  res
) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfEmptyOrUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const { type, texts } = JSON.parse(req.body) as IFeedbackInput;
  const mutationResult = await insertFeedback(authHeader, type, texts);
  sendAPIResult(res, mutationResult);
};
