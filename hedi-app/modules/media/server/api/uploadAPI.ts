import { NextApiHandler } from "next";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { getUserAuthHeader } from "@/modules/auth/server";
import { uploadAndInsertMedia } from "../query/uploadAndInsertMedia";
import { IMediaMutationResult } from "../../types";

export const uploadAPI: NextApiHandler<IMediaMutationResult[]> = async (
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

  const result = uploadAndInsertMedia(req, authHeader);

  sendAPIResult(res, result);
};
