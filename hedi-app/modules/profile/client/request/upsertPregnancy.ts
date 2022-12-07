import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import {
  IPregnancyInput,
  IUpsertPregnancyResponse,
  upsertPregnancyAPIUrl,
} from "../../types";

export function upsertPregnancy(
  input?: IPregnancyInput,
  route?: string,
  lang?: string
): Promise<IUpsertPregnancyResponse> {
  return jsonPost<IUpsertPregnancyResponse>(upsertPregnancyAPIUrl, {
    input,
    route,
    lang,
  })
    .catch(e => {
      console.error(e);
      return null;
    })
    .then(resp => resp ?? { success: false });
}
