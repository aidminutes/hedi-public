import { jsonPost } from "@/modules/common/utils";
import { myProfileRouteAPIUrl } from "../../types";
import { IAPIResponse } from "@/modules/model";

export const requestMyProfileRoute = (lang: string): Promise<string | null> =>
  jsonPost<IAPIResponse<string>>(myProfileRouteAPIUrl, { lang }).then(res =>
    res && res.data ? res.data : null
  );
