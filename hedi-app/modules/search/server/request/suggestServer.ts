import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";
import {
  ISolrSuggestion,
  ISuggestEndPoint,
  SolrDefaultSuggestionEndPoint,
} from "../../types";
import { requestFromSolr } from "./requestFromSolr";

export async function suggestServer(
  searchText: string,
  suggestEndPoint: ISuggestEndPoint = SolrDefaultSuggestionEndPoint
): Promise<IHTTPError | ISolrSuggestion> {
  // TODO language filter
  const params = {
    "suggest.q": !searchText ? "" : searchText,
  };

  const reqBody = JSON.stringify({ params });
  return requestFromSolr(suggestEndPoint.endPointUrl, reqBody).then<
    ISolrSuggestion | IHTTPError
  >(response => {
    if (response.status !== 200) return responseToIHTTPError(response);
    return response.json().then(resp => {
      const resultCollection = resp.suggest?.[suggestEndPoint.dictionaryName]?.[
        searchText
      ] as ISolrSuggestion;
      return resultCollection || { numFound: 0, suggestions: [] };
    });
  });
}
