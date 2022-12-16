import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import {
  IMidwifeRequestPreferenceInput,
  IUpsertMidwifeRequestPreferenceResponse,
} from "@/modules/networking/types";
import { upsertMidwifeRequestPreferenceAPIUrl } from "@/modules/networking/types";

export function upsertMidwifeRequestPreference(
  input?: IMidwifeRequestPreferenceInput,
  route?: string,
  lang?: string
): Promise<IUpsertMidwifeRequestPreferenceResponse> {
  return jsonPost<IAPIResponse<IUpsertMidwifeRequestPreferenceResponse>>(
    upsertMidwifeRequestPreferenceAPIUrl,
    {
      input,
      route,
      lang,
    }
  )
    .catch(e => {
      console.error(e);
      return null;
    })
    .then(result => {
      return result && result.success && result.data
        ? (result as IUpsertMidwifeRequestPreferenceResponse)
        : { success: false };
    });
}
