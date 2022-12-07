import { Search } from "carbon-components-react";
import { ISearchInputProps, useSearchInput } from "./useSearchInput";

export const SearchInput: React.FunctionComponent<ISearchInputProps> = props => {
  const {
    searchQuery,
    suggestQuery,
    handleSearch,
    handleSuggestSelected,
    ...searchProps
  } = useSearchInput(props);

  return (
    <>
      <Search
        data-search
        autoComplete="off"
        value={searchQuery}
        onChange={handleSearch}
        type="search"
        labelText=""
        {...searchProps}
      />
    </>
  );
};
