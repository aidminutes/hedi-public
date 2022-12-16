import { NextApiHandler } from "next";
import { getUserAuthHeader, getUserInfo } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { insertOrganisationConnectionMutation } from "../query";
import { ITransitionOrganisationConnectionResponse } from "../../types";

export const insertMyOrganisationConnectionAPI: NextApiHandler<ITransitionOrganisationConnectionResponse> = async (
  req,
  res
) => {
  const authHeader = await getUserAuthHeader(req);
  const userInfo = await getUserInfo(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const reqBody = (req.body ? JSON.parse(req.body) : {}) as {
    businessRoute: string;
    lang?: string;
  };

  if (!userInfo?.route) {
    console.warn("User info/route is missing!");
  }

  const result = await insertOrganisationConnectionMutation(
    {
      input: {
        sender: "/" + reqBody.lang + userInfo!.route, // TODO - eric: the user info route is missing a lang-code which is breaking the backend-call, adding "lang" here seems like a hack
        recipient: reqBody.businessRoute,
      },
    },
    authHeader
  ).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
