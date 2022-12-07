import { getLinkPreview } from "link-preview-js";
import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { URLPreviewResponse } from "../../types";

export const urlPreviewAPI: NextApiHandler<URLPreviewResponse> = async (
  req,
  res
) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfEmptyOrUnauthorized(
    req,
    res,
    authHeader
  );

  if (isErrorSent || !authHeader) {
    return;
  }

  const urlReq = JSON.parse(req.body);

  if (!urlReq || !urlReq.url) {
    throw "Invalid request";
  }

  try {
    const preview = await getLinkPreview(urlReq.url);
    sendAPIResult(res, preview);
  } catch (e) {
    // Ignore error -> invalid url
    sendAPIResult(res, null);
  }
};
