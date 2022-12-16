import { IErrorResponse, IsIHTTPError } from "@/modules/common/error";
import { getIEntitiesTranslated } from "@/modules/common/server";
import {
  sendAPIHttpError,
  sendAPISuccess,
  transformUrlRoutes,
} from "@/modules/common/utils";
import { GQArticleEntry } from "@/modules/editorial/article/server/gqTypes/GQIArticleEntry";
import { IArticleEntry } from "@/modules/editorial/article/types";
import { IAPIResponse } from "@/modules/model";
import { NextApiHandler } from "next";
import {
  ISuggestEntry,
  ISuggestInput,
  ISuggestResponse,
  getSolrSuggestArticleEndPoint,
} from "../../types";
import { suggestServer } from "../request";

const solrSuggestArticleAPI: NextApiHandler<
  IErrorResponse | ISuggestResponse
> = async (req, res) => {
  const searchInput = (req.body ? JSON.parse(req.body) : {}) as ISuggestInput;
  const searchText = (searchInput.searchText || "").trim().replace(/\s+/g, " ");

  const data = await suggestServer(
    searchText,
    getSolrSuggestArticleEndPoint(searchInput.lang || "de")
  );

  if (IsIHTTPError(data)) sendAPIHttpError(res, data);
  else {
    const solrResultItems = (data.suggestions || []).map(suggestItem => {
      const [_, path, lang] = (suggestItem.payload || "").split(":");
      const route = "/" + lang + "/" + transformUrlRoutes(path, "taxonomy");
      return {
        route,
        weight: suggestItem.weight,
        term: suggestItem.term,
      } as ISuggestEntry;
    });
    const entries = await getIEntitiesTranslated<IArticleEntry>(
      [GQArticleEntry],
      solrResultItems.map(item => item.route)
    );
    let suggestResponse: ISuggestResponse = { count: 0, result: [] };
    if (entries.length != solrResultItems.length) {
      const singleItems = await Promise.all(
        solrResultItems.map(item =>
          getIEntitiesTranslated<IArticleEntry>(
            [GQArticleEntry],
            [item.route]
          ).then(items => {
            if (items && Array.isArray(items) && items.length)
              return {
                route: items[0].route,
                term: item.term,
                weight: item.weight,
                // entry: items[0],
              } as ISuggestEntry;
            return null;
          })
        )
      );
      suggestResponse.result = singleItems
        .filter(x => x)
        .map(x => x as ISuggestEntry);
    } else {
      suggestResponse.result = entries.map(
        (item, index) =>
          ({
            route: item.route,
            term: solrResultItems[index].term,
            weight: solrResultItems[index].weight,
            // entry: item,
          } as ISuggestEntry)
      );
    }
    suggestResponse.count = suggestResponse.result.length;

    sendAPISuccess(res, {
      success: true,
      data: suggestResponse,
    } as IAPIResponse<ISuggestResponse>);
  }
};
export default solrSuggestArticleAPI;
