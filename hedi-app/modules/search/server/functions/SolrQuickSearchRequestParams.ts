import { IQuickSearchInput } from "../../types";
import {
  convertSolrFiltersToString,
  getSolrLanguageFilter,
  makeQueryStringFromGroupedFields,
  searchConfigs,
  solrInternalDocIdField,
} from "../solr";

export function getSolrQueryForQuickSearch(
  searchParams: IQuickSearchInput
): string {
  const solarFields =
    `id, ${solrInternalDocIdField}, ` +
    searchConfigs.quickSearch.groupedFields
      .flatMap(group => group.fields)
      .map(field => field.replace("{lang}", searchParams.lang))
      .join(", ");

  const optionParams = {
    wt: "json",
    fl: solarFields,
    rows: searchConfigs.quickSearch.defaultMaximumResultsCount,
  };

  let queryText = makeQueryStringFromGroupedFields(
    searchConfigs.quickSearch.groupedFields,
    "name",
    searchParams.searchText || "",
    searchParams.lang
  );

  const requestBody = {
    query: !queryText || !queryText.length ? "*:*" : queryText,
    filter: [getSolrLanguageFilter(searchParams.lang)].concat(
      convertSolrFiltersToString(searchConfigs.quickSearch.filters)
    ),
    params: optionParams,
  };

  return JSON.stringify(requestBody);
}
