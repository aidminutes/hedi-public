import { IScoreItem } from "../../types";
import { ScoredRoute } from "../request/searchProfileServer";
import { solrInternalDocIdField } from "../solr";

export function transformSolrResultToScoredRoute(
  entity: any,
  scoreDetails?: { [key: string]: IScoreItem },
  addScore?: boolean,
  routeFieldName?: string
): ScoredRoute {
  let [_, route, _2] = entity[solrInternalDocIdField].split(":");
  if (routeFieldName) {
    route = entity[routeFieldName];
    if (Array.isArray(route)) route = route[0];
  } else route = "/" + route;
  if (addScore)
    return {
      route,
      scoreDetails,
    };
  return {
    route,
  };
}
