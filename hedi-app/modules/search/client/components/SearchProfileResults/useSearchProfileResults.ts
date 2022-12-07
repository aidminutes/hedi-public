import { useState, useEffect } from "react";
import { IErrorResponse, IsIErrorResponse } from "@/modules/common/error";
import {
  IBodyComponent,
  IImageComponent,
  IInlineNotificationComponent,
  ILabelComponent,
} from "@/modules/components";
import { IProfileSearchResponse } from "@/modules/search/types";
import { IProfileEntryDefinition } from "@/modules/profile/types";
import { ISearchProfileFilterProps } from "../SearchProfileFilterBox/ISearchProfileFilterProps";
import { IAddress } from "@/modules/profile/types";
import { Location } from "@/modules/map/types";
import { geoDistance, parseLatLong } from "@/modules/common/utils/coordinates";
import { IProfileCardDefinition } from "@/modules/profile/client/components/ProfileCard/types";

export interface ISearchResultProps extends ISearchProfileFilterProps {
  results: IErrorResponse | IProfileSearchResponse | null;
  errorNotification: IInlineNotificationComponent;
  noResultNotification: IInlineNotificationComponent;
  noResultIcon: IImageComponent;
  noResultHint: IBodyComponent;
  noResultHintHeadline: ILabelComponent;
  noResultAdditionalHint: IBodyComponent;
  resultsHeadline: ILabelComponent;
  profileEntryDefinition: IProfileEntryDefinition;
  showScores?: boolean;
  loadingHelpText: ILabelComponent;
  isLoading: boolean;
  isNotSearchedYet?: boolean;
  searchText: string;
  resultsFor: ILabelComponent;
  resultsText: ILabelComponent;
  resultText: ILabelComponent;
  profileCard: IProfileCardDefinition;
}

export function useSearchProfileResults(props: ISearchResultProps) {
  const { results, filter } = props;
  const [
    searchResults,
    setSearchResults,
  ] = useState<IProfileSearchResponse | null>(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<IErrorResponse>();
  const [resultCount, setResultCount] = useState<Number | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (IsIErrorResponse(results)) {
      setHasError(true);
      setError(results);
      setSearchResults(null);
      return;
    }
    setHasError(false);

    if (
      results &&
      results.result &&
      results.result.length > 0 &&
      results.count > 0
    ) {
      setSearchResults(results);
      setResultCount(results.count);
      return;
    }
    setSearchResults(null);
  }, [results]);

  const getGeoDistance = (profileAddress: IAddress[]) => {
    const distance =
      location && location.latLong && profileAddress && profileAddress.length
        ? geoDistance(
            location?.latLong,
            parseLatLong(
              profileAddress[0]?.latLong ||
                profileAddress[0]?.latLongApprox ||
                ""
            )
          )
        : "9999"; //when there is no profile adress give those the least benefit and show them at end

    return distance;
  };

  const handleLocationChange = (location: Location) => setLocation(location);

  return {
    results: searchResults as IProfileSearchResponse | null,
    hasError,
    error,
    count: resultCount,
    handleLocationChange,
    getGeoDistance,
  };
}
