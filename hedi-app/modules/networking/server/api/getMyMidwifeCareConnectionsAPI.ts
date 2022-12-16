import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { getMyMidwifeCareConnections } from "../query";
import { IMidwifeCareConnection } from "../../types";

export const getMyMidwifeCareConnectionsAPI: NextApiHandler<IMidwifeCareConnection | null> = async (
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

  const { routes, lang } = (req.body ? JSON.parse(req.body) : {}) as {
    routes?: string[];
    lang?: string;
  };
  const myConnections = await getMyMidwifeCareConnections(
    authHeader,
    routes,
    lang
  );
  sendAPIResult(res, myConnections, true);
};
