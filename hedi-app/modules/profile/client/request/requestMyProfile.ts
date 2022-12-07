import { jsonPost } from "@/modules/common/utils";
import { UserProfile, myProfileAPIUrl } from "../../types";
import { IAPIResponse } from "@/modules/model";

export const requestMyProfile = (lang: string): Promise<UserProfile | null> =>
  jsonPost<IAPIResponse<UserProfile>>(myProfileAPIUrl, { lang }).then(res =>
    res && res.data ? res.data : null
  );
