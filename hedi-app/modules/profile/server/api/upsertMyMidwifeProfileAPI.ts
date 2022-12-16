import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertMyMidwifeProfileMutation } from "../query/upsertMyMidwifeProfileMutation";
import { IMidwifeInput, IUpsertMidwifeResponse } from "../../types";
import { sendAPIErrorIfInvalidPostalCode } from "./utils";

export const upsertMyMidwifeProfileAPI: NextApiHandler<IUpsertMidwifeResponse> = async (
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
    input?: IMidwifeInput;
    lang: string;
  };
  const {
    isErrorSent: isPostalCodeErrorSent,
  } = await sendAPIErrorIfInvalidPostalCode(
    res,
    input.input?.addresses?.[0]?.postalCode
  );
  if (isPostalCodeErrorSent) return;
  const result = await upsertMyMidwifeProfileMutation(input, authHeader).catch(
    err => {
      console.warn(err);
      return null;
    }
  );
  sendAPIResult(res, result);
};
