import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertOrganisationMutation } from "../query";
import { IOrganisationInput, IUpsertOrganisationResponse } from "../../types";
import { sendAPIErrorIfInvalidPostalCode } from "./utils";

export const upsertOrganisationAPI: NextApiHandler<IUpsertOrganisationResponse> = async (
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

  const input = (req.body ? JSON.parse(req.body) : { lang: "de" }) as {
    input?: IOrganisationInput;
    route?: string;
    lang: string;
  };
  const {
    isErrorSent: isPostalCodeErrorSent,
  } = await sendAPIErrorIfInvalidPostalCode(
    res,
    input.input?.addresses?.[0]?.postalCode
  );
  if (isPostalCodeErrorSent) return;
  const result = await upsertOrganisationMutation(input, authHeader).catch(
    err => {
      console.warn(err);
      return null;
    }
  );
  sendAPIResult(res, result);
};
