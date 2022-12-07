import { NextApiHandler } from "next";
import { userGQuery } from "@/modules/graphql";
import { getUserAuthHeader } from "@/modules/auth/server";
import { IsIHTTPError } from "@/modules/common/error";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIHttpError,
  sendAPISuccess,
} from "@/modules/common/utils";
import { querySSOLoginToken } from "..";

const loginTokenAPI: NextApiHandler<any> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  userGQuery<{ session: string }>(
    authHeader,
    `query SessionCookie { session }`
  ).then(async data => {
    if (IsIHTTPError(data)) {
      sendAPIHttpError(res, data);
      return;
    } else {
      const tokenResponse = await querySSOLoginToken(data.session);
      sendAPISuccess(res, { success: true, data: tokenResponse });
      return;
    }
  });
};

export default loginTokenAPI;
