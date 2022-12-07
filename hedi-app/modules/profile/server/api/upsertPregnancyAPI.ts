import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertPregnancyMutation } from "../query";
import { IPregnancyInput, IUpsertPregnancyResponse } from "../../types";

export const upsertPregnancyAPI: NextApiHandler<IUpsertPregnancyResponse> = async (
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

  const input = (req.body ? JSON.parse(req.body) : {}) as {
    input?: IPregnancyInput;
    route?: string;
    lang?: string;
  };
  const result = await upsertPregnancyMutation(input, authHeader).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
