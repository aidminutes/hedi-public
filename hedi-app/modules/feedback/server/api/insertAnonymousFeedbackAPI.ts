import { NextApiHandler } from "next";
import { sendAPIResult } from "@/modules/common/utils";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertAnonymousFeedback } from "../query/insertAnonymousFeedback";
import { IFeedbackInput } from "../../types";

export const insertAnonymousFeedbackAPI: NextApiHandler<IMutationResponse> = async (
  req,
  res
) => {
  const { type, texts } = JSON.parse(req.body) as IFeedbackInput;
  const mutationResult = await insertAnonymousFeedback(type, texts);
  sendAPIResult(res, mutationResult);
};
