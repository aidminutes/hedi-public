import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { ICareConnectionRoomResponse } from "../../types/IConnection";
import { chatRoomMutation } from "../query/chatRoomMutation";

export const chatRoomAPI: NextApiHandler<ICareConnectionRoomResponse> = async (
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
    route: string;
  };
  const result = await chatRoomMutation(input, authHeader).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
