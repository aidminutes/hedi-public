import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { IAccountMenu } from "../components/Header/AccountMenu/types";
import { myAccountMenuAPIUrl } from "../../types/APIUrls";

export const getMyAccountMenu = (
  lang: string
): Promise<IAPIResponse<IAccountMenu | undefined>> =>
  jsonPost<IAPIResponse<IAccountMenu | undefined>>(myAccountMenuAPIUrl, {
    lang,
  }).then(data => (data ? data : { success: false }));
