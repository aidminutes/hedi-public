import { logAndNull } from "@/modules/common/error";
import { jsonPost } from "@/modules/common/utils";
import { IPage } from "@/modules/common/types";
import { useEffect, useRef, useState } from "react";
import {
  IProfileSearchResponse,
  ISearchProfileInput as ISearchProfileRequest,
  RankedScoredIProfile,
  searchProfileAPIUrl,
} from "./../../../types";
import { ISearchProfileInput } from "./types";
import { useSearchUrlUpdateOnRouteChange } from "@/modules/search/client/hooks";
import { getSearchQueryTextFromSegments } from "@/modules/search/utils/getSearchQueryTextFromSegments";
import { IAPIResponse } from "@/modules/model";
import { ISearchProfileFilter } from "@/modules/search/types/ISearchProfileFilter";
import { getDistanceFromRoute } from "../SearchProfileFilterBox/distanceUtils";

export function useSearchProfileView(props: IPage) {
  const { route, lang } = props;

  const initialQueryText = getSearchQueryTextFromSegments(route);

  const [profileResults, setProfileResults] = useState<
    RankedScoredIProfile[] | null
  >();

  const [queryText, setQueryText] = useState(initialQueryText);
  const [searchText, setSearchText] = useState("");
  const [hasFilter, setHasFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotSearchedYet, setIsNotSearchedYet] = useState(true);
  const [filter, setFilter] = useState<ISearchProfileFilter>({
    distanceItem: null,
    userLocation: null,
    isUserDefaultLocation: false,
  });

  useSearchUrlUpdateOnRouteChange(initialQueryText, queryText);

  const handleFilterChange = (filter: ISearchProfileFilter) => {
    setHasFilter(!filter.isUserDefaultLocation);
    setFilter(filter);
  };

  const handleQueryTextChanged = (value: string) => {
    setQueryText(value);
  };

  const handleKeyPress = (key: string) => {
    if (key === "Enter" && !isLoading) doSearch();
  };

  const doSearch = () => {
    setSearchText(queryText.trim());
    const isValidToSearch = queryText.trim().length >= 1;
    if (isValidToSearch) {
      const distance = getDistanceFromRoute(filter.distanceItem?.route);
      requestSearch({
        location:
          filter.userLocation && filter.userLocation.latLong?.length
            ? `${filter.userLocation.latLong[0]},${filter.userLocation.latLong[1]}`
            : "",
        distance: distance && hasFilter ? distance.toString() : undefined,
        queryText,
      });
    } else setProfileResults(null);
  };
  useEffect(() => {
    if (initialQueryText !== "") doSearch();
  }, [initialQueryText]);
  useEffect(() => {
    doSearch();
  }, [filter]);

  const requestSearch = (input: ISearchProfileInput) => {
    setIsLoading(true);
    jsonPost<IAPIResponse<IProfileSearchResponse>>(
      searchProfileAPIUrl,
      toRequestObject(input, lang)
    )
      .then(resp => logAndNull(resp))
      .then(resp => {
        setIsLoading(false);
        setIsNotSearchedYet(false);
        if (resp) {
          setProfileResults(resp.data?.result);
        }
      })
      .catch(err => {
        setIsLoading(false);
        setProfileResults(null);
      });
  };

  const searchResults = profileResults ?? null;

  return {
    isLoading,
    data: searchResults,
    queryText,
    hasFilter,
    searchText,
    filter,
    isNotSearchedYet,
    handleFilterChange,
    handleQueryTextChanged,
    doSearch,
    handleKeyPress,
  };
}

function toRequestObject(
  searchInput: ISearchProfileInput,
  lang = "de"
): ISearchProfileRequest {
  // TODO: Add latLon and distance, as soon as search input type refactoring (locationData!) is merged into main.
  const { location, distance, queryText } = searchInput;
  return {
    lang,
    locationData: {
      location,
      distance: distance ? getDistanceFromRoute(distance) : undefined,
      searchJustInLocation: !!distance,
    },
    searchText: queryText,
  };
}
