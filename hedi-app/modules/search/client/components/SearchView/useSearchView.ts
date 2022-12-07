import {
  findGroupInstance,
  ILabelComponent,
  isLabel,
} from "@/modules/components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSearch, useSearchUrlUpdateOnRouteChange } from "../../hooks";
import { getSearchQueryTextFromSegments } from "@/modules/search/utils/getSearchQueryTextFromSegments";

export interface ISearchProps {
  // TODO type after removing app page
  content: any;
}
export function useSearchView(searchProps: ISearchProps) {
  const router = useRouter();
  const { segments } = router.query;
  const { route, lang } = searchProps.content;

  const initialQueryText = getSearchQueryTextFromSegments(route);

  const [queryText, setQueryText] = useState(initialQueryText);
  const [searchText, setSearchText] = useState(initialQueryText);
  useEffect(() => {
    setSearchText(initialQueryText);
  }, [initialQueryText]);

  const handleQueryChanged = (text: string) => {
    setQueryText(text);
  };

  const handleClick = () => {
    setSearchText(queryText.trim());
  };

  const handleKeyPress = (key: string) => {
    if (key === "Enter" && !isLoading) handleClick();
  };

  const [filter, setFilter] = useState("");

  const handleFilter = (filterText: string) => {
    setFilter(filterText);
  };

  useSearchUrlUpdateOnRouteChange(initialQueryText, queryText);

  const {
    content,
    content: { components },
  } = searchProps;

  const locale = router.locale ?? "de";
  const { defaultLocale } = router;

  const filterTypes = findGroupInstance(components, "filter");

  let filterLabel: ILabelComponent[] = [];
  if (filterTypes)
    filterTypes.components.forEach(a => {
      if (isLabel(a)) filterLabel.push(a);
    });

  const { data, error, isLoading } = useSearch({
    searchText,
    lang: locale,
    filter,
  });

  return {
    handleFilter,
    handleQueryChanged,
    handleClick,
    handleKeyPress,
    initialQueryText,
    isLoading,
    data,
    error,
    lang,
    defaultLocale,
    content,
    filterTypes: filterLabel,
    queryText,
    searchText,
  };
}
