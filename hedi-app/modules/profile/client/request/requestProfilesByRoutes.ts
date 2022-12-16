import { jsonPost } from "@/modules/common/utils";
import { getProfilesByRoutesUrl, IBusinessProfile } from "../../types";
import { IAPIResponse } from "@/modules/model";

export const requestProfilesByRoutes = (
  lang: string,
  routes: string[]
): Promise<IBusinessProfile[] | null> =>
  jsonPost<IAPIResponse<IBusinessProfile[]>>(getProfilesByRoutesUrl, {
    lang,
    routes,
  }).then(res => (res && res.data ? res.data : null));
