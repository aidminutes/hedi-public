import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertMidwifeCareRequestMutation } from "@/modules/networking/server/query";
import {
  IUpsertMidwifeCareRequestInput,
  IUpsertMidwifeCareRequestResponse,
} from "@/modules/networking/types";

export const upsertMidwifeCareRequestAPI: NextApiHandler<IUpsertMidwifeCareRequestResponse> = async (
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
    input?: IUpsertMidwifeCareRequestInput;
    lang: string;
  };
  const result = await upsertMidwifeCareRequestMutation(
    input,
    authHeader
  ).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
