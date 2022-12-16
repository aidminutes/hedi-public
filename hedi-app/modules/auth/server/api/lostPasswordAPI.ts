import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import {
  IResetPasswordSendEmailRequest,
  IResetPasswordSendEmailResponse,
} from "@/modules/auth/types";
import { lostPasswordQuery } from "../query/lostPasswordQuery";

export const lostPasswordAPI: NextApiHandler<IResetPasswordSendEmailResponse> = async (
  req,
  res
) => {
  const { email, extraInfo, lang } = JSON.parse(
    req.body
  ) as IResetPasswordSendEmailRequest;
  const response = await lostPasswordQuery({
    email,
    extraInfo,
    lang,
  });
  sendAPIResult(res, response);
};
