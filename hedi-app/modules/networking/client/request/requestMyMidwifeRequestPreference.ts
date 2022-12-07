import { jsonFetcher } from "@/modules/common/utils";
import { IMidwifeRequestPreference } from "@/modules/networking/types";
import { myMidwifeRequestPreferenceAPIUrl } from "@/modules/networking/types";
import { IAPIResponse } from "@/modules/model";

export const requestMyMidwifeRequestPreference = (): Promise<IMidwifeRequestPreference | null> =>
  jsonFetcher<IAPIResponse<IMidwifeRequestPreference>>(
    myMidwifeRequestPreferenceAPIUrl
  ).then(res => res?.data ?? null);
