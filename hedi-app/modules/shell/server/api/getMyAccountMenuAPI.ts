import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { NextApiHandler } from "next";
import { IAccountMenu } from "../../client/components/Header/AccountMenu/types";
import { getMyAccountMenu } from "../query";

export const getMyAccountMenuAPI: NextApiHandler<
  IAPIResponse<IAccountMenu>
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;
  const { lang } = JSON.parse(req.body) as { lang: string };
  const data = await getMyAccountMenu(lang, authHeader);
  const response: IAPIResponse<IAccountMenu> = !!data
    ? {
        success: !!data,
        data: data,
      }
    : { success: false };
  sendAPIResult(res, response, true);
};
