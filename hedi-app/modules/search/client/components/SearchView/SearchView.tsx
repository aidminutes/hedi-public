import { SearchInput } from "@/modules/search/client/components";
import { Column, Loading, Row } from "carbon-components-react";
import React from "react";
import { useSearchView, ISearchProps } from "./useSearchView";
import { SearchResults } from "../SearchResults";
import { Body, Label, Button } from "@/modules/components";
import { getSearchViewDefinition } from "./getSearchViewDefinition";
import { Seperator } from "@/modules/common/client/components/Seperator";
import { InlineLoading } from "carbon-components-react";

export const SearchView = (props: ISearchProps): JSX.Element => {
  const {
    bodyText,
    callToActionHeadline,
    searchInput,
    loadingHelpText,
    components,
    introText,
    searchButton,
  } = getSearchViewDefinition(props.content.components);
  const {
    handleQueryChanged,
    handleClick,
    handleKeyPress,
    initialQueryText,
    isLoading,
    data,
    error,
    queryText,
    searchText,
  } = useSearchView(props);

  return (
    <div className="hedi--search-view">
      <Row className="hedi--search-view__search-input">
        <Column md={1} lg={2}></Column>
        <Column lg={12} md={6}>
          <div className="hedi--search-view__input-container">
            <SearchInput
              id={"search-results"}
              size={"xl"}
              onQueryChanged={e => handleQueryChanged(e)}
              query={initialQueryText}
              placeholder={searchInput.placeholder ?? "Artikel suchen"}
              onKeyPress={e => handleKeyPress(e.key)}
            />
            <div className="hedi--search-view__button-container">
              {isLoading ? (
                <div className="hedi--search-view__button--loading-indicator">
                  <InlineLoading />
                </div>
              ) : (
                <Button
                  {...searchButton}
                  disabled={queryText !== "" ? false : true}
                  onClick={() => handleClick()}
                />
              )}
            </div>
          </div>
        </Column>
      </Row>
      <Row>
        <Column lg={2} md={2}></Column>
        <Column md={4} lg={12}>
          <div className="hedi--search-view__intro-text ">
            <Body {...introText} />
          </div>
        </Column>
      </Row>
      <Seperator color="gray" type="l" />
      {!data && callToActionHeadline && searchText === "" && (
        <Row className="hedi--search-view__cta-headline">
          <Column md={1} lg={2}></Column>
          <Column>
            <Label {...callToActionHeadline} />
          </Column>
        </Row>
      )}
      {/* <Filter types={filterTypes} handleFilter={handleFilter} /> */}
      {/* <Seperator /> */}

      <div>{/* iterate article component */}</div>
      {
        //TODO should check for  empty array - even if there is no result will get loading overlay
        //data
      }

      <div className="hedi--search__results">
        <SearchResults
          results={!error && data ? data : null}
          components={components}
          isLoading={isLoading}
          loadingHelpText={loadingHelpText}
          searchText={searchText}
        />
      </div>
    </div>
  );
};
