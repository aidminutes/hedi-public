import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getProfileDetail } from "../query";
import { IBusinessProfile } from "../../types";

export const getByRoutesAPI: NextApiHandler<IBusinessProfile[] | null> = async (
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
  const { routes, lang } = JSON.parse(req.body) as {
    routes: string[];
    lang: string;
  };
  let profiles = await getProfileDetail(lang ?? "de", routes, authHeader);

  if (profiles) {
    profiles = profiles.filter(x => x && x.type.toLowerCase() != "personal");
  }
  sendAPIResult(res, profiles ?? [], true);
};
