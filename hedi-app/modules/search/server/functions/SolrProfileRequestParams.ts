import {
  ProfileFilterParam,
  ISearchProfileInput,
  isProfileFilterParam,
  isIGroupedSearchFilter,
} from "../../types";
import {
  convertSolrFiltersToString,
  convertSolrFilterToString,
  getSearchConfigEntityTypeFields,
  getSolrLanguageFilter,
  makeQueryStringFromGroupedFields,
  searchConfigs,
  solrFieldNameBuilder,
  SolrFieldType,
  SolrFilter,
  solrInternalDocIdField,
} from "../solr";
import { solrEntityTypeFilters } from "../solr/solrEntityTypeFilters";
import { transformSolrSearchFilters } from "./filterUtils";

export function transformParamsToSolrRequestStringForSearchProfile(
  searchParams: ISearchProfileInput
): string {
  const solarFields =
    `id, ${solrInternalDocIdField}, ` +
    searchConfigs.searchProfile.groupedFields
      .flatMap(group => group.fields)
      .map(field => field.replace("{lang}", searchParams.lang))
      .join(", ");

  const optionParams = {
    wt: "json",
    fl: solarFields,
    debugQuery: "on",
    "debug.explain.structured": true,
    rows:
      searchParams.pagination?.take ||
      searchConfigs.searchProfile.defaultMaximumResultsCount,
    start: searchParams.pagination?.skip || 0,
  };

  let queryText = "";
  if (searchParams.searchText)
    queryText +=
      makeQueryStringFromGroupedFields(
        searchConfigs.searchProfile.groupedFields,
        "fuzzy_search",
        searchParams.searchText,
        searchParams.lang
      ) + " ";

  queryText = queryText.trim();
  const requestBody = {
    query: !queryText || !queryText.length ? "*:*" : queryText,
    filter: [getSolrLanguageFilter(searchParams.lang)].concat(
      convertSolrFiltersToString(searchConfigs.searchProfile.filters)
    ),
    params: optionParams,
  };
  if (searchParams.filters?.include) {
    const profileTypes = (searchParams.filters.include.filter(
      f => !isIGroupedSearchFilter(f) && isProfileFilterParam(f)
    ) as ProfileFilterParam[]).map(f => f.subtype);
    if (profileTypes && profileTypes.length)
      requestBody.filter.push(
        convertSolrFilterToString({
          field: solrFieldNameBuilder(
            SolrFieldType.String,
            false,
            "profile__bundle"
          ),
          value: profileTypes.join(" || ").toLowerCase(),
        } as SolrFilter)
      );
  }

  if (searchParams.locationData?.latLong) {
    const latLong = searchParams.locationData.latLong
      .replace(/\s+/g, "")
      .split(",")
      .map(part => parseFloat(part).toFixed(5))
      .join(",");
    const locationFields = searchConfigs.searchProfile.groupedFields.find(
      group => group.name == "location"
    )?.fields;
    if (locationFields && locationFields.length) {
      const getGeoFilter = () =>
        locationFields
          .map(
            field =>
              `(${field}:* AND {!geofilt pt=${latLong} sfield=${field} d=${
                searchParams.locationData?.distance || 10000
              }})`
          )
          .join(" OR ");
      // requestBody.query += " (" + getGeoFilter() + ")"; // add to filter to get score in debug info
      if (searchParams.locationData?.searchJustInLocation)
        requestBody.filter.push(getGeoFilter());

      // get geoDistance as result too
      optionParams.fl += `, geoDistance:geodist(${locationFields[0]},${latLong}), geoDistanceApprox:geodist(${locationFields[1]},${latLong})`;
    }
  }

  const searchFilters = transformSolrSearchFilters(
    searchParams.filters,
    getSearchConfigEntityTypeFields(
      searchConfigs.searchProfile,
      searchParams.lang
    ),
    solrEntityTypeFilters
  );
  if (searchFilters.length) requestBody.filter.push(...searchFilters);

  return JSON.stringify(requestBody);
}
