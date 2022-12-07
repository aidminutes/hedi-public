import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { getMyOrganisationConnections } from "../query";
import { IOrganisationConnection } from "../../types";

export const getMyOrganisationConnectionsAPI: NextApiHandler<IOrganisationConnection | null> = async (
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
  const myConnections = await getMyOrganisationConnections(
    authHeader,
    routes,
    lang
  );
  sendAPIResult(res, myConnections, true);
};
