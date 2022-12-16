import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";
import { transformUrlRoutes } from "@/modules/common/utils";
import { IQuickSearchInput } from "../../types";
import { getSolrQueryForQuickSearch } from "../functions";
import { solrInternalDocIdField } from "../solr";
import { requestFromSolr } from "./requestFromSolr";

export async function quickSearchServer(
  searchParams: IQuickSearchInput
): Promise<string[] | IHTTPError> {
  const reqBody = getSolrQueryForQuickSearch(searchParams);
  const response = await requestFromSolr("/select", reqBody);
  if (response.status !== 200) return responseToIHTTPError(response);
  const jsonResponse = await response.json();

  let content = jsonResponse.response.docs;
  if (!content?.length) return [];
  return content.map((entity: any) => transformResultToRouteString(entity));
}

const transformResultToRouteString = (entity: any): string => {
  let route = entity[solrInternalDocIdField].split(":")[1];
  route = "/" + transformUrlRoutes(route, "taxonomy");
  return route;
};
