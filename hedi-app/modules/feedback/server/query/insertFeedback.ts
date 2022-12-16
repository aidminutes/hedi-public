import { IAuthHeader } from "@/modules/auth/types";
import { logAndNull } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertFeedbackMutationGQ } from "../gqTypes/GQInsertFeedbackResponse";

export async function insertFeedback(
  authHeader: IAuthHeader,
  type: string,
  texts: string[]
): Promise<IMutationResponse | null> {
  return userGQuery<{ insertFeedback: IMutationResponse }>(
    authHeader,
    insertFeedbackMutationGQ,
    {
      texts,
      type,
    }
  ).then(data => logAndNull(data)?.insertFeedback ?? null);
}
