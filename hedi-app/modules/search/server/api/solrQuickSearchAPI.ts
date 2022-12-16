import { IErrorResponse, IsIHTTPError } from "@/modules/common/error";
import { quickSearchServer } from "../request";
import { NextApiHandler } from "next";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIHttpError,
  sendAPIResult,
} from "@/modules/common/utils";
import { getUserAuthHeader } from "@/modules/auth/server";
import { getIEntitiesTranslated } from "@/modules/common/server";
import { GQArticleEntry } from "@/modules/editorial/article/server/gqTypes/GQIArticleEntry";
import { GQGlossaryTerm } from "@/modules/editorial/glossary/gqTypes/GQIGlossaryTerm";
import { GQBusinessProfileEntry } from "@/modules/profile/server/gqTypes/GQBusinessProfileEntry";
import { IEntry } from "@/modules/common/types/IEntry";
import { IQuickSearchInput, IQuickSearchResponse } from "../../types";

export const solrQuickSearchAPI: NextApiHandler<
  IErrorResponse | IQuickSearchResponse
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const searchParams = (req.body
    ? JSON.parse(req.body)
    : {}) as IQuickSearchInput;
  const quickSearchSolrResults = await quickSearchServer(searchParams);
  const gqTypes = [GQArticleEntry, GQGlossaryTerm, GQBusinessProfileEntry];

  const data =
    Array.isArray(quickSearchSolrResults) && quickSearchSolrResults.length > 0
      ? await getIEntitiesTranslated<IEntry>(
          gqTypes,
          quickSearchSolrResults,
          searchParams.lang
        ).then(
          entries =>
            ({
              result: entries,
              count: entries.length,
            } as IQuickSearchResponse)
        )
      : ({ result: [], count: 0 } as IQuickSearchResponse);

  if (IsIHTTPError(data)) sendAPIHttpError(res, data);
  else sendAPIResult(res, data, true);
};
export default solrQuickSearchAPI;
