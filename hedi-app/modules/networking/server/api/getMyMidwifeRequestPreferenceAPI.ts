import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getMyMidwifeRequestPreference } from "@/modules/networking/server/query";
import { IMidwifeRequestPreference } from "@/modules/networking/types";

export const getMyMidwifeRequestPreferenceAPI: NextApiHandler<IMidwifeRequestPreference | null> = async (
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

  const myMidwifeRequestPreference = await getMyMidwifeRequestPreference(
    authHeader
  );
  sendAPIResult(res, myMidwifeRequestPreference, true);
};
