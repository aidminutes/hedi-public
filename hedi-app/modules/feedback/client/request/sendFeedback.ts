import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import {
  FeedbackType,
  insertAnonymousFeedbackAPIUrl,
  insertFeedbackAPIUrl,
} from "../../types";

export async function sendFeedbacks(
  type: FeedbackType,
  texts: string[]
): Promise<IMutationResponse | null> {
  return jsonPost<IAPIResponse<IMutationResponse | null>>(
    type == "BrowserTest"
      ? insertAnonymousFeedbackAPIUrl
      : insertFeedbackAPIUrl,
    {
      type,
      texts,
    }
  )
    .then(resp => resp?.data || null)
    .catch(err => {
      console.log(err);
      return null;
    });
}
