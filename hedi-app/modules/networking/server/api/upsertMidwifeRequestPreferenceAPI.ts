import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertMidwifeRequestPreferenceMutation } from "@/modules/networking/server/query";
import {
  IMidwifeRequestPreferenceInput,
  IUpsertMidwifeRequestPreferenceResponse,
} from "@/modules/networking/types";

export const upsertMidwifeRequestPreferenceAPI: NextApiHandler<IUpsertMidwifeRequestPreferenceResponse> = async (
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
    input?: IMidwifeRequestPreferenceInput;
    route?: string;
    lang?: string;
  };
  const result = await upsertMidwifeRequestPreferenceMutation(
    input,
    authHeader
  ).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
