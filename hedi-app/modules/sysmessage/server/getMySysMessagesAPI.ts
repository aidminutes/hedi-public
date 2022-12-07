import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { getMySysMessages } from "./query/getMySysMessages";
import { ISysMessage } from "../types";

export const getMySysMessagesAPI: NextApiHandler<ISysMessage | null> = async (
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
  const { lang, onlyUndelivered } = req.query as {
    lang: string;
    onlyUndelivered: "true" | undefined;
  };
  const mySysMessages = await getMySysMessages(
    authHeader,
    lang,
    onlyUndelivered == "true"
  );
  sendAPIResult(res, mySysMessages, true);
};
