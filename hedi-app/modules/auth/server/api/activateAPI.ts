import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { activateQuery } from "../query";
import { IActivateResponse, IActivateRequest } from "@/modules/auth/types";

export const activateAPI: NextApiHandler<IActivateResponse> = async (
  req,
  res
) => {
  const { token, lang } = JSON.parse(req.body) as IActivateRequest;
  const response = await activateQuery({
    token,
    lang,
  });
  sendAPIResult(res, response);
};
