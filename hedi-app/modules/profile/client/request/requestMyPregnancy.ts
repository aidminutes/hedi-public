import { jsonFetcher } from "@/modules/common/utils";
import { IPregnancy, myPregnancyAPIUrl } from "../../types";
import { IAPIResponse } from "@/modules/model";

export const requestMyPregnancy = (): Promise<IPregnancy | null> =>
  jsonFetcher<IAPIResponse<IPregnancy>>(myPregnancyAPIUrl).then(
    res => res?.data ?? null
  );
