import {
  convertSolrFiltersToString,
  getSearchConfigEntityTypeFields,
  getSolrLanguageFilter,
  searchConfigs,
  solrFieldNameBuilder,
  SolrFieldType,
  solrInternalDocIdField,
} from "../solr";
import { ISearchInput } from "@/modules/search/types";
import { transformSolrSearchFilters } from "./filterUtils";
import { solrEntityTypeFilters } from "../solr/solrEntityTypeFilters";

export function transformParamsToSolrRequestString(
  searchInput: ISearchInput,
  getHighlighted: boolean
): string {
  const allFulltexts = solrFieldNameBuilder(SolrFieldType.Fulltext, true, "*");
  const solarFields =
    `${solrInternalDocIdField}, ${allFulltexts}, ` +
    searchConfigs.searchContent.groupedFields
      .flatMap(group => group.fields)
      .map(field => field.replace("{lang}", searchInput.lang))
      .join(", ");
  const highlightParams = {
    wt: "json",
    fl: solarFields,
    hl: "on",
    "hl.method": "unified",
    "hl.fl": `${allFulltexts}, fuzzy_fulltext`,
    "hl.snippets": "1",
    "hl.fragsize": "200",
    "hl.tag.pre": "<mark>",
    "hl.tag.post": "</mark>",
    rows: searchConfigs.searchContent.defaultMaximumResultsCount, //TODO to implement pagination when required
    // number of results at a time
  };

  const optionParams = {
    wt: "json",
    fl: solarFields,
  };
  const requestBody = {
    query:
      !searchInput.searchText || searchInput.searchText.length === 0
        ? "*:*"
        : `fuzzy_fulltext:(${searchInput.searchText})`,
    filter: [getSolrLanguageFilter(searchInput.lang)].concat(
      convertSolrFiltersToString(searchConfigs.searchContent.filters)
    ),
    params: getHighlighted ? highlightParams : optionParams,
  };

  const searchFilters = transformSolrSearchFilters(
    searchInput.filters,
    getSearchConfigEntityTypeFields(
      searchConfigs.searchContent,
      searchInput.lang
    ),
    solrEntityTypeFilters
  );
  if (searchFilters.length) requestBody.filter.push(...searchFilters);

  return JSON.stringify(requestBody);
}
