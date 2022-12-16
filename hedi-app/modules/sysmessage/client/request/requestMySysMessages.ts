import { jsonFetcher } from "@/modules/common/utils";
import { ISysMessage, mySysMessagesAPIUrl } from "../../types";
import { IAPIResponse } from "@/modules/model";

export const requestMySysMessages = (
  lang: string,
  onlyUndelivered: boolean = false
): Promise<ISysMessage[]> =>
  jsonFetcher<IAPIResponse<ISysMessage[]>>(
    `${mySysMessagesAPIUrl}/?lang=${lang}${
      onlyUndelivered ? "&onlyUndelivered=true" : ""
    }`
  ).then(response => response?.data ?? []);
