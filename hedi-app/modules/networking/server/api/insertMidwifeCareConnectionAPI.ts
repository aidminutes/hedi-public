import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { insertMidwifeCareConnectionMutation } from "../query";
import {
  ITransitionMidwifeCareConnectionResponse,
  InsertConnectionInput,
} from "../../types";

export const insertMidwifeCareConnectionAPI: NextApiHandler<ITransitionMidwifeCareConnectionResponse> = async (
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
    input: InsertConnectionInput;
    lang?: string;
  };
  const result = await insertMidwifeCareConnectionMutation(
    input,
    authHeader
  ).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
