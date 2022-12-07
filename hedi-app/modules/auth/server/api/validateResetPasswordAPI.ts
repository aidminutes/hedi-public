import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { IValidateResetPasswordResponse } from "../../types/IValidateResetPasswordResponse";
import { IValidateResetPasswordRequest } from "../../types/IValidateResetPasswordRequest";
import { validateResetPasswordQuery } from "../query/validateResetPasswordQuery";

export const validateResetPasswordAPI: NextApiHandler<IValidateResetPasswordResponse> = async (
  req,
  res
) => {
  const { token, lang } = JSON.parse(req.body) as IValidateResetPasswordRequest;

  const response = await validateResetPasswordQuery({
    token,
    lang,
  });
  sendAPIResult(res, response);
};
