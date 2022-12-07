import React from "react";

import { Body, InlineNotification, Label } from "@/modules/components";
import { NoResultHintBox } from "@/modules/common/client/components";
import {
  ISearchResultProps,
  useSearchProfileResults,
} from "./useSearchProfileResults";
import { ClickableTile, Column, Row } from "carbon-components-react";
import { DebugInfo } from "../Debug/DebugInfo";
import { RankedScoredIProfile } from "@/modules/search/types";
import { ProfileCard } from "@/modules/profile/client/components/ProfileCard";
import { selectPrimaryData } from "@/modules/profile/utils";
import { getProfileCardType } from "@/modules/profile/client/components/Profile/getProfileCardType";
import { SearchProfileFilterBox } from "../SearchProfileFilterBox/SearchProfileFilterBox";

export const SearchProfileResults = (props: ISearchResultProps) => {
  const {
    errorNotification,
    noResultNotification,
    resultsHeadline,
    profileEntryDefinition,
    showScores,
    noResultIcon,
    noResultHint,
    noResultHintHeadline,
    loadingHelpText,
    isLoading,
    searchText,
    resultsFor,
    resultsText,
    resultText,
    noResultAdditionalHint,
    filter,
    profileCard,
  } = props;
  const {
    results,
    hasError,
    count,
    getGeoDistance,
    handleLocationChange,
  } = useSearchProfileResults(props);

  const noResultsData = {
    notification: noResultNotification,
    hint: noResultHint,
    icon: noResultIcon,
    headline: noResultHintHeadline,
    additionalHint: noResultAdditionalHint,
  };

  if (hasError) return <InlineNotification {...errorNotification} />;
  return (
    <>
      <>
        <Row className="hedi--search-results__headline">
          <Column>
            <Label
              {...resultsHeadline}
              text={
                (isLoading ? ` ${loadingHelpText.text} ...` : "") +
                (!isLoading
                  ? searchText === ""
                    ? ""
                    : `${resultsHeadline.text} ${resultsFor.text} <span class="hedi--search-results__headline--searchtext">»${searchText}«</span>`
                  : "")
              }
            />
            {count && results && !isLoading && (
              <p className="hedi--search-results__count">
                {count} {count === 1 ? resultText.text : resultsText.text}
              </p>
            )}
          </Column>
        </Row>

        <Row>
          <Column className="hedi--search-results__filter">
            <SearchProfileFilterBox
              {...props}
              onLocationChange={handleLocationChange}
              hasResult={!!results && results.count > 0}
            />
          </Column>
        </Row>
        {!results && searchText && !isLoading && (
          <>
            {/* <Label
              {...resultsHeadline}
              text={noResultsData.notification.title}
            /> */}
            <NoResultHintBox {...noResultsData} />
            {/* <InlineNotification {...noResultNotification} /> */}
          </>
        )}
        {results
          ? results.result.map(
              (result: RankedScoredIProfile, index: number) => {
                if (!result) return null;
                return (
                  <Row>
                    <Column {...{ sm: 4, md: 8, lg: 16 }}>
                      {/* <DebugInfo
                      showDebugInfo={showScores}
                      debugInfo={result.scoreDetails}> */}
                      <div className="hedi--profile-card--wrap">
                        <ClickableTile href={result.route}>
                          <ProfileCard
                            key={result.label + index}
                            title={result.label}
                            profession={result.profession}
                            address={selectPrimaryData(result.addresses)}
                            showImage={false}
                            distanceInKm={parseInt(
                              getGeoDistance(result.addresses)
                            )}
                            distanceTemplate={profileCard.distanceTemplate}
                            shortDistanceText={profileCard.shortDistanceText}
                            href={result.route}
                            profileType={getProfileCardType(result.type)}
                            {...profileEntryDefinition}
                          />
                        </ClickableTile>
                      </div>
                      {/* </DebugInfo> */}
                    </Column>
                  </Row>
                );
              }
            )
          : null}
      </>
    </>
  );
};
