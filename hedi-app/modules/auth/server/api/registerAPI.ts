import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { registerQuery } from "../query";
import { IRegisterRequest, IRegisterResponse } from "@/modules/auth/types";

export const registerAPI: NextApiHandler<IRegisterResponse> = async (
  req,
  res
) => {
  const {
    givenName,
    familyName,
    mail,
    pass,
    role,
    lang,
    commit,
    extraInfo,
  } = JSON.parse(req.body) as IRegisterRequest;
  const response = await registerQuery(
    {
      givenName,
      familyName,
      mail,
      pass,
      role,
      extraInfo,
    },
    lang,
    commit
  );
  sendAPIResult(res, response);
};
