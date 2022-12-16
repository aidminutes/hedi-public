import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";
import {
  ISearchProfileInput,
  IScoreItem,
  IProfileSearchResponse,
} from "../../types";
import {
  addScoreToResultItems,
  transformParamsToSolrRequestStringForSearchProfile,
  transformSolrResultToScoredRoute,
} from "../functions";
import { searchConfigs } from "../solr";
import { requestFromSolr } from "./requestFromSolr";
import { fixGeoDistances } from "./searchMidwifeServer";

export type ScoredRoute = {
  route: string;
  scoreDetails?: { [key: string]: IScoreItem };
};

export async function searchProfileServer(
  searchParams: ISearchProfileInput
): Promise<IProfileSearchResponse | IHTTPError> {
  const reqBody = transformParamsToSolrRequestStringForSearchProfile(
    searchParams
  );
  const response = await requestFromSolr("/select", reqBody);

  if (response.status !== 200) return responseToIHTTPError(response);
  const jsonResponse = await response.json();

  let content = jsonResponse.response.docs;
  if (!content?.length) return { result: [], count: 0, stats: [] };

  fixGeoDistances(content);
  const filtersCount = {
    text: searchParams.searchText ? 1 : 0,
    location: searchParams.locationData?.location ? 1 : 0,
  };

  content = addScoreToResultItems(
    content,
    jsonResponse.debug,
    searchConfigs.searchProfile.groupedFields,
    filtersCount
  );

  return {
    result: content.map((entity: any) =>
      transformSolrResultToScoredRoute(entity, entity.scoreDetails, true)
    ),
    count: content.length,
    stats: [], // TODO do we need stats here?
  };
}
