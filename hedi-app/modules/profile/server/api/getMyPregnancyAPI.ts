import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getMyPregnancy } from "../query";
import { IPregnancy } from "../../types";

export const getMyPregnancyAPI: NextApiHandler<IPregnancy | null> = async (
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

  const profile = await getMyPregnancy(authHeader);
  sendAPIResult(res, profile, true);
};
