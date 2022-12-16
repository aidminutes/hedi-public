import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { IArticleContent } from "../../types";
import { articleContentAPIUrl } from "../../types/APIUrls";

export const getArticleContent = (
  route: string,
  hrefLang?: string
): Promise<IAPIResponse<IArticleContent | undefined>> =>
  jsonPost<IAPIResponse<IArticleContent | undefined>>(articleContentAPIUrl, {
    route,
    hrefLang,
  }).then(data => (data ? data : { success: false }));
