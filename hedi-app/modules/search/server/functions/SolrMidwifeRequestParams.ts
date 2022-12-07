import { transformCareTypeToRoute } from ".";
import { ISearchMidwifeInput } from "../../types";
import {
  convertSolrFiltersToString,
  getSearchConfigEntityTypeFields,
  getSearchConfigFieldsByGroupName,
  getSolrLanguageFilter,
  makeQueryStringFromGroupedFields,
  searchConfigs,
  solrInternalDocIdField,
} from "../solr";
import { solrEntityTypeFilters } from "../solr/solrEntityTypeFilters";
import { transformSolrSearchFilters } from "./filterUtils";

export function transformParamsToSolrRequestStringForSearchMidwife(
  searchParams: ISearchMidwifeInput
): string {
  const solarFields =
    `id, ${solrInternalDocIdField}, ` +
    searchConfigs.searchMidwife.groupedFields
      .flatMap(group => group.fields)
      .map(field => field.replace("{lang}", searchParams.lang))
      .join(", ");

  const optionParams = {
    wt: "json",
    fl: solarFields,
    debugQuery: "on",
    "debug.explain.structured": true,
    rows: searchConfigs.searchMidwife.defaultMaximumResultsCount,
  };

  let queryText = "";
  const careTypesFilter: string[] = [];

  if (
    searchParams.careTypeDateRanges &&
    searchParams.careTypeDateRanges.length
  ) {
    const careTypeFilter =
      makeQueryStringFromGroupedFields(
        searchConfigs.searchMidwife.groupedFields,
        "careTypes",
        searchParams.careTypeDateRanges.map(careTypeDateRange =>
          transformCareTypeToRoute(careTypeDateRange.careType)
        ),
        searchParams.lang,
        "ranged"
      ) + " ";
    queryText += careTypeFilter;
    careTypesFilter.push(careTypeFilter);
  }

  if (searchParams.services && searchParams.services.length)
    queryText +=
      makeQueryStringFromGroupedFields(
        searchConfigs.searchMidwife.groupedFields,
        "services",
        searchParams.services,
        searchParams.lang,
        "ranged"
      ) + " ";

  if (searchParams.languages && searchParams.languages.length)
    queryText +=
      makeQueryStringFromGroupedFields(
        searchConfigs.searchMidwife.groupedFields,
        "languages",
        searchParams.languages,
        searchParams.lang,
        "ranged"
      ) + " ";

  queryText = queryText.trim();
  const requestBody = {
    query: !queryText || !queryText.length ? "*:*" : queryText,
    filter: careTypesFilter
      .concat(getSolrLanguageFilter(searchParams.lang))
      .concat(convertSolrFiltersToString(searchConfigs.searchMidwife.filters)),
    params: optionParams,
  };

  if (searchParams.locationData?.latLong) {
    const latLong = searchParams.locationData.latLong.replace(/\s+/g, "");
    const locationFields = getSearchConfigFieldsByGroupName(
      searchConfigs.searchMidwife.groupedFields,
      "location",
      searchParams.lang
    );
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
      requestBody.query += " (" + getGeoFilter() + ")"; // add to filter to get score in debug info
      if (searchParams.locationData.distance)
        requestBody.filter.push(getGeoFilter());

      // get geoDistance as result too
      optionParams.fl += `, geoDistance:geodist(${locationFields[0]},${latLong}), geoDistanceApprox:geodist(${locationFields[1]},${latLong})`;
    }
  }

  const dateRangeField = getSearchConfigFieldsByGroupName(
    searchConfigs.searchMidwife.groupedFields,
    "daterange",
    searchParams.lang
  )[0];
  searchParams.careTypeDateRanges?.forEach(careTypeDateRange => {
    const fromDateStr = new Date(careTypeDateRange.fromDate).toISOString(),
      toDateStr = new Date(careTypeDateRange.toDate).toISOString();
    // get ${careTypeDateRange.careType}IntersectRatio as result too
    optionParams.fl += `, ${careTypeDateRange.careType}IntersectRatio:intersectRatio("${fromDateStr}","${toDateStr}","${dateRangeField}")`;
  });

  const searchFilters = transformSolrSearchFilters(
    searchParams.filters,
    getSearchConfigEntityTypeFields(
      searchConfigs.searchMidwife,
      searchParams.lang
    ),
    solrEntityTypeFilters
  );
  if (searchFilters.length) requestBody.filter.push(...searchFilters);

  return JSON.stringify(requestBody);
}
