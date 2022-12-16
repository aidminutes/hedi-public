import { useEffect, useState } from "react";
import { SearchProps } from "carbon-components-react";

export interface ISearchInputProps extends Partial<SearchProps> {
  onQueryChanged: (text: string) => void;
  query?: string;
}

export function useSearchInput(props: ISearchInputProps) {
  const { onQueryChanged, query, ...searchProps } = props;

  const queryText = query ?? "";
  const [searchQuery, setSearchQuery] = useState(queryText);

  useEffect(() => {
    if (queryText) setSearchQuery(queryText);
  }, [queryText]);

  const [suggestQuery, setSuggestQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSuggestQuery(query);
    setSearchQuery(query);
    onQueryChanged(query);
  };

  const handleSuggestSelected = (text: string) => {
    setSearchQuery(text);
    setSuggestQuery("");
    onQueryChanged(text);
  };

  return {
    searchQuery,
    suggestQuery,
    handleSearch,
    handleSuggestSelected,
    ...searchProps,
  };
}
