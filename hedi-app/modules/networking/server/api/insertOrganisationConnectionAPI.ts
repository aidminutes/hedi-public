import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { insertOrganisationConnectionMutation } from "../query";
import {
  ITransitionOrganisationConnectionResponse,
  InsertConnectionInput,
} from "../../types";

export const insertOrganisationConnectionAPI: NextApiHandler<ITransitionOrganisationConnectionResponse> = async (
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
  const result = await insertOrganisationConnectionMutation(
    input,
    authHeader
  ).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
