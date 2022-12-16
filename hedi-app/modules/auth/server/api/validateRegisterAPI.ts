import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { registerQuery } from "../query";
import { IRegisterResponse, IRegisterValidate } from "@/modules/auth/types";

export const validateRegisterAPI: NextApiHandler<IRegisterResponse> = async (
  req,
  res
) => {
  const { givenName, familyName, mail, pass, role, lang } = JSON.parse(
    req.body
  ) as IRegisterValidate;
  const response = await registerQuery(
    {
      givenName,
      familyName,
      mail,
      pass,
      role,
    },
    lang,
    false
  );
  sendAPIResult(res, response);
};
