import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertProfessionalMutation } from "../query";
import { IProfessionalInput, IUpsertProfessionalResponse } from "../../types";
import { sendAPIErrorIfInvalidPostalCode } from "./utils";

export const upsertProfessionalAPI: NextApiHandler<IUpsertProfessionalResponse> = async (
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
    input?: IProfessionalInput;
    lang: string;
  };
  const {
    isErrorSent: isPostalCodeErrorSent,
  } = await sendAPIErrorIfInvalidPostalCode(
    res,
    input.input?.addresses?.[0]?.postalCode
  );
  if (isPostalCodeErrorSent) return;
  const result = await upsertProfessionalMutation(input, authHeader).catch(
    err => {
      console.warn(err);
      return null;
    }
  );
  sendAPIResult(res, result);
};
