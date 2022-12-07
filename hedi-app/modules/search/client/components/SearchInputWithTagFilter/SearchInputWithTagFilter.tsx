import { InlineLoading, Search } from "carbon-components-react";
import {
  ISearchInputProps,
  useSearchInputWithTagFilter,
} from "./useSearchInputWithTagFilter";
import { CountedTagMultiSelect } from "@/modules/common/client/components";
import { ISelectComponent } from "@/modules/components";

export const SearchInputWithTagFilter: React.FunctionComponent<
  ISearchInputProps & {
    tagSelect: ISelectComponent;
    tagCounts: Record<string, number>;
    onTagFilterChange: (selectedTags: string[]) => void;
  }
> = props => {
  const {
    searchQuery,
    suggestQuery,
    handleSearch,
    handleSuggestSelected,
    isLoading,
    ...searchProps
  } = useSearchInputWithTagFilter(props);

  return (
    <div>
      <Search
        data-search
        autoComplete="off"
        value={searchQuery}
        onChange={handleSearch}
        type="search"
        labelText=""
        renderIcon={isLoading ? <InlineLoading /> : undefined}
        {...searchProps}
      />
      <CountedTagMultiSelect
        items={props.tagSelect.items}
        counts={props.tagCounts}
        hideZeroCounted
        onChange={props.onTagFilterChange}
      />
    </div>
  );
};
