import { getUserAuthHeader } from "@/modules/auth/server";
import {
  getLangByRoute,
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getProfileDetail } from "../query";
import { IOrganisation, UserProfile } from "../../types";

export const getProfileDetailAPI: NextApiHandler<
  UserProfile | IOrganisation | null
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const {
    query: { route },
  } = req;
  const lang = getLangByRoute(`${route}`);
  const profiles = await getProfileDetail(
    lang ?? "de",
    route as string[],
    authHeader
  );
  sendAPIResult(res, profiles?.[0] ?? null, true);
};
