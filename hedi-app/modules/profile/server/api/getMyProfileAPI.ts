import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getMyProfile } from "../query";
import { UserProfile } from "../../types";

export const getMyProfileAPI: NextApiHandler<UserProfile | null> = async (
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

  const { lang } = JSON.parse(req.body ?? "{}") as { lang: string };
  const profile = await getMyProfile(
    typeof lang === "string" ? lang : "de",
    authHeader
  );
  sendAPIResult(res, profile, true);
};
