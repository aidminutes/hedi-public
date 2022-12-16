import {
  Column,
  Loading,
  Row,
  Search,
  InlineLoading,
} from "carbon-components-react";
import React from "react";
import { useSearchProfileView } from "./useSearchProfileView";
import { SearchProfileResults } from "../SearchProfileResults";
import { IPage } from "@/modules/common/types";
import { getSearchProfileViewDefinition } from "./getSearchProfileViewDefinition";
import {
  Slider,
  Body,
  Label,
  TextInput,
  Button,
} from "@/modules/components/client/components";
import { useSearchIProfileSort } from "../../hooks/useSearchIProfileSort";
import { IsIErrorResponse } from "@/modules/common/error";
import { Seperator } from "@/modules/common/client/components/Seperator";
import { IProfileSearchResponse } from "@/modules/search/types";

export const SearchProfileView = ({
  content,
}: {
  content: IPage;
}): JSX.Element => {
  const showScores = true; // TODO just for debug
  const localSort = true; // TODO just for debug

  const {
    textInput,
    noResultNotification,
    errorNotification,
    resultsHeadline,
    profileEntryDefinition,
    bodyText,
    callToActionHeadline,
    noResultHint,
    noResultIcon,
    noResultHintHeadline,
    loadingHelpText,
    searchButton,
    resultsFor,
    resultsText,
    resultText,
    filterLabel,
    toFilterLabel,
    zipcodeInput,
    filterBody,
    perimeterSelect,
    zipcodeHintLabel,
    resetLabel,
    zipcodeErrorMessage,
    profileCard,
    noResultAdditionalHint,
  } = getSearchProfileViewDefinition(content.components);
  const {
    queryText,
    isLoading,
    data,
    hasFilter,
    searchText,
    filter,
    isNotSearchedYet,
    handleQueryTextChanged,
    doSearch,
    handleKeyPress,
    handleFilterChange,
  } = useSearchProfileView(content);
  const resultComponents = {
    noResultNotification,
    errorNotification,
    resultsHeadline,
    profileEntryDefinition,
    noResultIcon,
    noResultHint,
    noResultHintHeadline,
    loadingHelpText,
    isLoading,
    searchText,
    resultsFor,
    resultsText,
    resultText,
    filterLabel,
    toFilterLabel,
    zipcodeInput,
    filterBody,
    perimeterSelect,
    zipcodeHintLabel,
    resetLabel,
    zipcodeErrorMessage,
    profileCard,
    noResultAdditionalHint,
  };
  const {
    sortFields,
    handleSortFieldChange,
    sortedData,
  } = useSearchIProfileSort(
    data && !IsIErrorResponse(data)
      ? ({
          result: data,
          count: data.length,
          stats: {},
        } as IProfileSearchResponse)
      : data
  );

  return (
    <div className="hedi--search-view">
      <Row className="hedi--search-view__search-input">
        <Column md={1} lg={2}></Column>
        <Column lg={12} md={6}>
          <div className="hedi--search-view__input-container">
            <Search
              labelText=""
              placeholder={textInput.placeholder}
              data-search
              autoComplete="off"
              value={queryText}
              type="search"
              onChange={e => handleQueryTextChanged(e.target.value)}
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
                  disabled={queryText.trim() === ""}
                  onClick={() => doSearch()}
                />
              )}
            </div>
          </div>
        </Column>
        <Column md={1} lg={2}></Column>
      </Row>
      <Row className="hedi--search-view__intro-text">
        <Column md={1} lg={2}></Column>
        <Column lg={12} md={6}>
          <Body body={bodyText?.body} />
        </Column>
        <Column md={1} lg={2}></Column>
      </Row>
      <Seperator color="gray" type="l" />
      <Row className="hedi--search-view__cta-headline">
        <Column md={1} lg={2}></Column>
        <Column>
          {!sortedData && callToActionHeadline && (
            <Label {...callToActionHeadline} />
          )}
        </Column>
        <Column md={1} lg={2}></Column>
      </Row>
      {/* <Row>
        <Column md={1} lg={2}></Column>
        <Column>
          <div>
            <TextInput
              {...locationInput}
              onChange={e => handleLocationChanged(e.target.value)}
            />
            <Slider
              {...distanceSlider}
              step={1}
              stepMultiplier={2}
              hideTextInput={false}
              onChange={({ value }) => handleDistanceChange(value)}
            />
          </div>
        </Column>
        <Column md={1} lg={2}></Column>
      </Row> */}
      {/* <Row>
        <Column></Column>
      </Row> */}
      {/* <Seperator /> */}
      <Row>
        <Column md={1} lg={2}></Column>
        <Column>
          <div className="hedi--search__results">
            {/* {localSort && Array.isArray(data) && data.length ? (
                <Dropdown id="sorter" items={sortFields} label="Sort By" titleText="Sort By" onChange={e => handleSortFieldChange(e.selectedItem ?? "")} />
              ) : (
                ""
              )} */}
            <SearchProfileResults
              results={sortedData}
              {...resultComponents}
              showScores={showScores}
              hasFilter={hasFilter}
              onFilter={handleFilterChange}
              filter={filter}
              isNotSearchedYet={isNotSearchedYet}
            />
            {/* {locations?.length > 0 ? (
            <Map currentLocation={locations[0]} locations={locations} />
          ) : (
            ""
          )} */}
          </div>
        </Column>
        <Column md={1} lg={2}></Column>
      </Row>
    </div>
  );
};
