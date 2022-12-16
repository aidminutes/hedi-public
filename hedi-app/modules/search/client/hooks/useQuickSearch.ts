import {
  IErrorResponse,
  IsIErrorResponse,
  IsIHTTPError,
} from "@/modules/common/error";
import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse, isIErrorAPIResponse } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import { useEffect } from "react";
import useSWR from "swr";
import {
  IQuickSearchInput,
  IQuickSearchResponse,
  quickSearchAPIUrl,
} from "../../types";

export function useQuickSearch(lang: string) {
  const [searchText, onSearchTextChange, setSearchText] = useTextInput("");

  useEffect(() => () => setSearchText(""), []);

  const { data } = useSWR(
    [quickSearchAPIUrl, searchText, lang],
    (url, searchText, lang) =>
      jsonPost<
        IAPIResponse<IErrorResponse> | IAPIResponse<IQuickSearchResponse>
      >(url, {
        searchText,
        lang,
      } as IQuickSearchInput)
  );
  const searchResponse =
    data && !IsIErrorResponse(data)
      ? data
      : ({
          success: false,
          data: { result: [], count: 0 },
        } as IAPIResponse<IQuickSearchResponse>);

  return {
    onSearchTextChange,
    elements: isIErrorAPIResponse(searchResponse)
      ? []
      : searchResponse?.data?.result ?? [],
    searchText,
  };
}
