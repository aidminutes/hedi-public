import { sendAPIResult } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { NextApiHandler } from "next";
import { IArticleContent } from "../../types/IArticleContent";
import { getArticleContent } from "../query";

export const getArticleContentAPI: NextApiHandler<
  IAPIResponse<IArticleContent>
> = async (req, res) => {
  const { route, hrefLang } = JSON.parse(req.body) as {
    route: string;
    hrefLang?: string;
  };
  const data = await getArticleContent(route, hrefLang);
  const response: IAPIResponse<IArticleContent> = !!data
    ? {
        success: !!data,
        data: data,
      }
    : { success: false };
  sendAPIResult(res, response, true);
};
