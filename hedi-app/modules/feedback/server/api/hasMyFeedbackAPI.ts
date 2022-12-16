import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { hasMyFeedback } from "../query/hasMyFeedback";

export const hasMyFeedbackAPI: NextApiHandler<boolean | null> = async (
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
  const type = "profile_test"; // TODO make modifyable if more than one bundle / type of feedbacks

  const hasFeedback = await hasMyFeedback(authHeader, type);
  sendAPIResult(res, hasFeedback);
};
