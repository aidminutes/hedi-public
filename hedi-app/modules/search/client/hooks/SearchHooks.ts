import { IErrorResponse } from "@/modules/common/error";
import { jsonFetcher, jsonPost } from "@/modules/common/utils";
import { IArticle } from "@/modules/editorial/article/types";
import { ICategory } from "@/modules/editorial/category/types";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { IPage } from "@/modules/common/types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  ISearchEditorialProps,
  ISearchEditorialResponse,
  ISuggestEntry,
} from "../../types";
import { searchAPIUrl, suggestAPIUrl } from "../../types";
import { transformSearchEditorialInput } from "./transformSearchEditorialInput";
import { IAPIResponse } from "@/modules/model";

export type SearchEditorialResponse =
  | IErrorResponse
  | (IArticle | ICategory | IGlossaryTerm | IPage)[];

const searchDelay = 300;

export function useSearch(searchEditorialProps: ISearchEditorialProps) {
  const [delayedCallId, setDelayedCallId] = useState<number>(0);
  const [searchText, setSearchText] = useState<string | null>();
  const [data, setData] = useState<ISearchEditorialResponse | null>(null);
  const isValidToSearch = () =>
    (searchEditorialProps.searchText || "").trim().length >= 1;
  const [isLoading, setIsLoading] = useState<boolean>(isValidToSearch());

  useEffect(() => {
    clearTimeout(delayedCallId);
    setDelayedCallId(
      window.setTimeout(function () {
        const newSearchText = isValidToSearch()
          ? searchEditorialProps.searchText + searchEditorialProps.filter
          : null;
        setSearchText(newSearchText);
        setIsLoading(!!newSearchText);
      }, searchDelay)
    );
  }, [searchEditorialProps.searchText]);

  const swrResult = useSWR<IAPIResponse<ISearchEditorialResponse>>(
    searchText,
    () =>
      jsonPost<IAPIResponse<ISearchEditorialResponse>>(
        searchAPIUrl,
        transformSearchEditorialInput(searchEditorialProps)
      )
        .then(res => {
          setIsLoading(false);
          setData(res?.data || null);
          return res
            ? res
            : ({
                success: false,
                data: { result: [], count: 0 } as ISearchEditorialResponse,
              } as IAPIResponse<ISearchEditorialResponse>);
        })
        .catch(err => {
          setIsLoading(false);
          setData(null);
          return {
            success: false,
            data: { result: [], count: 0 } as ISearchEditorialResponse,
          } as IAPIResponse<ISearchEditorialResponse>;
        })
  );
  return { ...swrResult, data, isLoading };
}

export function useSuggest(suggestText?: string) {
  const swrResult = useSWR<IErrorResponse | ISuggestEntry[]>(
    suggestText
      ? suggestAPIUrl + "?typeText=" + encodeURIComponent(suggestText)
      : null,
    (url: string) =>
      jsonFetcher<any>(url).then(
        response =>
          response.suggest.title[suggestText ? suggestText : "default"]
            .suggestions
      )
  );
  return { ...swrResult };
}
