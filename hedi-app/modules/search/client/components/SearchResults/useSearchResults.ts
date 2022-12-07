import { useState, useEffect } from "react";
import { IErrorResponse, IsIErrorResponse } from "@/modules/common/error";
import { IComponent, ILabelComponent } from "@/modules/components";
import {
  ISearchEditorialResponse,
  SearchEditorialResults,
} from "@/modules/search/types";

export interface ISearchResultProps {
  results: IErrorResponse | ISearchEditorialResponse | null;
  components: IComponent[];
  isLoading: boolean;
  loadingHelpText: ILabelComponent;
  searchText?: string;
}

export function useSearchResults(props: ISearchResultProps) {
  const { results } = props;
  const [searchResults, setSearchResults] = useState<
    SearchEditorialResults[] | null
  >(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<IErrorResponse>();
  const [resultCount, setResultCount] = useState<Number | null>(null);

  useEffect(() => {
    if (IsIErrorResponse(results)) {
      setHasError(true);
      setError(results);
      setSearchResults(null);
      return;
    }
    setHasError(false);
    if (results && results.count > 0) {
      setSearchResults(results.result);
      setResultCount(results.count);
      return;
    }
    setSearchResults(null);
  }, [results]);
  return {
    results: searchResults,
    hasError,
    error,
    count: resultCount,
  };
}
