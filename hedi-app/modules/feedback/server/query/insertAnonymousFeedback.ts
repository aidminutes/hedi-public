import { logAndNull } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertFeedbackMutationGQ } from "../gqTypes/GQInsertFeedbackResponse";
import { InsertFeedbackResponse } from "../../types/InsertFeedbackResponse";

export async function insertAnonymousFeedback(
  type: string,
  texts: string[]
): Promise<IMutationResponse | null> {
  return serviceGQuery<InsertFeedbackResponse>(insertFeedbackMutationGQ, {
    texts,
    type,
  }).then(data => logAndNull(data)?.insertFeedback ?? null);
}
