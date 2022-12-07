import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getMyProfileRoute } from "../query";

export const getMyProfileRouteAPI: NextApiHandler<string | null> = async (
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

  const { lang } = JSON.parse(req.body) as { lang: string };
  const route = await getMyProfileRoute(lang, authHeader);
  sendAPIResult(res, route);
};
