import { NextApiHandler } from "next";
import { IMutationResponse } from "@/modules/model";
import { IHTTPError } from "@/modules/common/error";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
  sendAPIServerError,
} from "@/modules/common/utils";
import { uploadAndInsertMedia } from "@/modules/media/server/query/uploadAndInsertMedia";
import { upsertProfileImageMutation } from "../query";

export const upsertProfileImageAPI: NextApiHandler<
  IMutationResponse | IHTTPError | null
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const mediaResult = await uploadAndInsertMedia(req, authHeader);
  const { files, route } = req.body ?? {};
  if (files && (!mediaResult || !mediaResult.filter(mr => mr.success).length))
    return sendAPIServerError(res, "Error by saving image");
  let imageRoute = "";
  if (mediaResult && mediaResult.length)
    imageRoute = mediaResult[0].media?.route ?? "";
  const upsertResult = await upsertProfileImageMutation(
    imageRoute,
    route,
    authHeader
  );
  sendAPIResult(res, upsertResult);
};
