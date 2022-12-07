import {
  findGroupInstance,
  ILabelComponent,
  isLabel,
} from "@/modules/components";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { useSearch, useSearchUrlUpdateOnRouteChange } from "../../hooks";
import { IArticleEntry, isIArticle } from "@/modules/editorial/article/types";
import { getSearchQueryTextFromSegments } from "@/modules/search/utils/getSearchQueryTextFromSegments";

export interface ISearchProps {
  // TODO type after removing app page
  content: any;
}
export function useSearchWithTagFilterView(searchProps: ISearchProps) {
  const router = useRouter();
  const { segments } = router.query;
  const { route, lang: contentLang } = searchProps.content;

  const initialQueryText = getSearchQueryTextFromSegments(route);

  const [queryText, setQueryText] = useState(initialQueryText);
  useEffect(() => {
    setQueryText(initialQueryText);
  }, [initialQueryText]);

  const handleQueryChanged = (text: string) => {
    setQueryText(text);
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

  const lang = router.locale ?? "de";
  const { defaultLocale } = router;

  const filterTypes = findGroupInstance(components, "filter");

  let filterLabel: ILabelComponent[] = [];
  if (filterTypes)
    filterTypes.components.forEach(a => {
      if (isLabel(a)) filterLabel.push(a);
    });

  const { data, error, isLoading } = useSearch({
    searchText: queryText,
    lang,
    filter,
  });

  const [tagCounts, setTagCounts] = useState({} as Record<string, number>);

  useEffect(() => {
    if (data) {
      let newTagCounts = {} as Record<string, number>;
      (data.result as IArticleEntry[]).forEach(entry => {
        entry.tags?.forEach(tag => {
          newTagCounts[tag.route] = newTagCounts[tag.route] ?? 0;
          newTagCounts[tag.route] += 1;
        });
      });
      setTagCounts(newTagCounts);
      setFilteredData(data);
    }
  }, [data]);

  const [filteredData, setFilteredData] = useState(data);

  const onTagFilterChange = useCallback(
    (selectedTagRoutes: string[]) => {
      if (selectedTagRoutes.length === 0) {
        setFilteredData(data);
        return;
      }
      if (data && Array.isArray(data)) {
        const newItems = data.result.filter(
          entry =>
            isIArticle(entry) &&
            entry.tags?.some(t => selectedTagRoutes.includes(t.route))
        );
        setFilteredData({
          count: newItems.length,
          result: newItems,
        });
      }
    },
    [data]
  );

  return {
    handleFilter,
    handleQueryChanged,
    initialQueryText,
    isLoading,
    data: data ?? null,
    filteredData: filteredData ?? null,
    lang,
    defaultLocale,
    content,
    filterTypes: filterLabel,
    tagCounts,
    onTagFilterChange,
  };
}
