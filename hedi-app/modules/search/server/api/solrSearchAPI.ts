import { searchServer } from "../request";
import { NextApiHandler } from "next";
import { IAPIResponse } from "@/modules/model";
import { IErrorResponse, IsIHTTPError } from "@/modules/common/error";
import {
  replaceLastSlashWithSharp,
  sendAPIHttpError,
  sendAPISuccess,
  transformUrlRoutes,
} from "@/modules/common/utils";
import { getIEntitiesTranslated } from "@/modules/common/server";
import { isIArticle } from "@/modules/editorial/article/types";
import { GQArticleEntry } from "@/modules/editorial/article/server/gqTypes/GQIArticleEntry";
import { isIGlossaryTerm } from "@/modules/editorial/glossary/types";
import { GQGlossaryTerm } from "@/modules/editorial/glossary/gqTypes/GQIGlossaryTerm";
import { partialHighlight } from "../functions/highlightUtils";
import {
  IHighlightedContent,
  ISearchEditorialInput,
  ISearchEditorialResponse,
  SearchEditorialResults,
} from "../../types";

interface IHighlightedSearchResult {
  route: string;
  highlight: IHighlightedContent;
  highlightedBody: string;
}
type HighlightedSearchResult = Record<string, IHighlightedSearchResult>;

export const solrSearchAPI: NextApiHandler<
  IErrorResponse | ISearchEditorialResponse
> = async (req, res) => {
  const searchInput = (req.body
    ? JSON.parse(req.body)
    : {}) as ISearchEditorialInput;
  const searchText = (searchInput.searchText || "").trim().replace(/\s+/g, " ");

  // HACK TODO re-enable after release
  searchInput.filters = searchInput.filters || {};
  searchInput.filters.include = [{ type: "Article" }];

  const data = await searchServer(searchInput);

  if (IsIHTTPError(data)) sendAPIHttpError(res, data);
  else {
    const searchData: HighlightedSearchResult = {};
    for (const entry of data) {
      const highlight = entry.highlightedContent;
      const highlightedBody = Array.isArray(highlight.highlightedBody)
        ? highlight.highlightedBody.join("...")
        : highlight.highlightedBody;
      const [_, path, lang] = entry.internalId.split(":");
      const route = "/" + lang + "/" + transformUrlRoutes(path, "taxonomy");

      searchData[entry.contentTitle] = {
        route,
        highlight,
        highlightedBody,
      };
    }
    const entries = await getIEntitiesTranslated<SearchEditorialResults>(
      [GQArticleEntry, GQGlossaryTerm],
      Object.keys(searchData).map(sd => searchData[sd].route)
    );
    const nonNull = entries.filter(
      entry => isIArticle(entry) || isIGlossaryTerm(entry)
    );
    nonNull.forEach(entry => {
      const { highlight, highlightedBody } =
        searchData[entry.label.trim()] || {};
      if (isIArticle(entry)) {
        entry.label = partialHighlight(
          highlight?.highlightedTitle ?? entry.label,
          searchText
        );
        entry.summary = partialHighlight(
          highlightedBody ?? entry.summary,
          searchText
        );
      } else if (isIGlossaryTerm(entry)) {
        const strippedhighlightedBody = highlightedBody?.replace(
          /<[^>]+>/g,
          ""
        );
        entry.label = partialHighlight(
          highlight?.highlightedTitle ?? entry.label,
          searchText
        );
        entry.body = partialHighlight(
          highlightedBody && entry.label !== strippedhighlightedBody
            ? highlightedBody
            : entry.body,
          searchText
        );
        entry.route = replaceLastSlashWithSharp(entry.route);
      }
    });
    sendAPISuccess(res, {
      success: true,
      data: {
        result: nonNull,
        count: nonNull.length,
      } as ISearchEditorialResponse,
    } as IAPIResponse<ISearchEditorialResponse>);
  }
};
export default solrSearchAPI;
