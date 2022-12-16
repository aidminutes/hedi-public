import { Column, Row } from "carbon-components-react";
import React from "react";
import {
  useSearchWithTagFilterView,
  ISearchProps,
} from "./useSearchWithTagFilterView";
import { SearchResults } from "../SearchResults";
import { Body, Label } from "@/modules/components";
import { getSearchWithTagFilterViewDefinition } from "./getSearchWithTagFilterViewDefinition";
import { SearchInputWithTagFilter } from "@/modules/search/client/components/SearchInputWithTagFilter";

export const SearchWithTagFilterView = (props: ISearchProps): JSX.Element => {
  const {
    bodyText,
    callToActionHeadline,
    searchInput,
    loadingHelpText,
    tagSelect,
    components,
  } = getSearchWithTagFilterViewDefinition(props.content.components);
  const {
    handleQueryChanged,
    initialQueryText,
    isLoading,
    data,
    filteredData,
    tagCounts,
    onTagFilterChange,
  } = useSearchWithTagFilterView(props);

  return (
    <div className="hedi--search-view">
      <Row className="hedi--search-view__intro-text">
        <Column lg={10} md={5}>
          <Body body={bodyText?.body} />
        </Column>
      </Row>
      <Row className="hedi--search-view__search-input">
        <Column lg={10} md={5}>
          <SearchInputWithTagFilter
            id={"search-results"}
            size={"xl"}
            onQueryChanged={e => handleQueryChanged(e)}
            query={initialQueryText}
            placeholder={searchInput.placeholder ?? "Artikel suchen"}
            isLoading={isLoading}
            tagSelect={tagSelect}
            tagCounts={tagCounts}
            onTagFilterChange={onTagFilterChange}
          />
        </Column>
      </Row>

      <Row>
        <Column>
          {!filteredData && callToActionHeadline && (
            <Label {...callToActionHeadline} />
          )}
        </Column>
      </Row>
      {/* <Filter types={filterTypes} handleFilter={handleFilter} /> */}
      {/* <Seperator /> */}

      <div>{/* iterate article component */}</div>
      {
        //TODO should check for  empty array - even if there is no result will get loading overlay
        //data
      }
      <div className="hedi--search__results">
        <SearchResults
          results={filteredData}
          components={components}
          isLoading={isLoading}
          loadingHelpText={loadingHelpText}
        />
      </div>
    </div>
  );
};
