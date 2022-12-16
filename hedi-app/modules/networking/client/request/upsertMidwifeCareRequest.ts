import {
  IUpsertMidwifeCareRequestInput,
  IUpsertMidwifeCareRequestResponse,
} from "@/modules/networking/types";
import { jsonPost } from "@/modules/common/utils";
import { upsertMidwifeCareRequestAPIUrl } from "@/modules/networking/types";

export async function upsertMidwifeCareRequest(
  lang: string,
  input?: IUpsertMidwifeCareRequestInput
): Promise<IUpsertMidwifeCareRequestResponse> {
  try {
    const data = await jsonPost<IUpsertMidwifeCareRequestResponse>(
      upsertMidwifeCareRequestAPIUrl,
      {
        input,
        lang,
      }
    );
    if (data && data.data) {
      data.data.created = new Date(data.data.created);
    }
    return data || { success: false };
  } catch (e: unknown) {
    const error = e as Error;
    console.error(error);
    return { success: false, errors: { [error.message]: error.message } };
  }
}
