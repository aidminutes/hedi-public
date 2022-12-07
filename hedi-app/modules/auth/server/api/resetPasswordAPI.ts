import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { IResetPasswordRequest } from "../../types/IResetPasswordRequest";
import { IResetPasswordResponse } from "../../types/IResetPasswordResponse";
import { resetPasswordQuery } from "../query/resetPasswordQuery";

export const resetPasswordAPI: NextApiHandler<IResetPasswordResponse> = async (
  req,
  res
) => {
  const { token, password, lang } = JSON.parse(
    req.body
  ) as IResetPasswordRequest;
  const response = await resetPasswordQuery({
    token,
    password,
    lang,
  });
  sendAPIResult(res, response);
};
