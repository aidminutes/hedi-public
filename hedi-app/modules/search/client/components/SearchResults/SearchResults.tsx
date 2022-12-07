import React from "react";

import { Label, Body } from "@/modules/components";
import { useSearchResults, ISearchResultProps } from "./useSearchResults";
import { transformSearchComponents } from ".";
import { Row, Column } from "carbon-components-react";
import { Entry, NoResultHintBox } from "@/modules/common/client/components";
export const SearchResults = (props: ISearchResultProps) => {
  const { results, hasError, count } = useSearchResults(props);
  const { searchText } = props;
  //const categoryBlocks: JSX.Element[] = [];
  const {
    resultsHeadline,
    defaultLocale,
    breadcrumb,
    noResultData,
    isLoading,
    loadingHelpText,
    resultsBody,
    allArticle,
    resultsFor,
    resultsText,
    resultText,
  } = transformSearchComponents(props);
  if (hasError || (results && count === null))
    return (
      <>
        {resultsHeadline && (
          <Label
            {...resultsHeadline}
            text={
              resultsHeadline.text +
              (isLoading ? ` (${loadingHelpText.text})` : "")
            }
          />
        )}
        <NoResultHintBox {...noResultData} />
      </>
    );
  return (
    <>
      {results && resultsHeadline && (
        <Row className="hedi--search-results__headline">
          <Column md={1} lg={2} sm={0}></Column>
          <Column md={6} lg={12}>
            <Label
              {...resultsHeadline}
              text={
                (isLoading ? ` ${loadingHelpText.text} ...` : "") +
                (!isLoading
                  ? searchText === ""
                    ? allArticle.text
                    : `${resultsHeadline.text}  ${resultsFor.text} <span class="hedi--search-results__headline--searchtext">»${searchText}«</span>`
                  : "")
              }
            />
            {count && (
              <p className="hedi--search-results__count">
                {count} {count === 1 ? resultText.text : resultsText.text}
              </p>
            )}
          </Column>
          <Column md={2} lg={4} className="desktop-only">
            <div className="hedi--search-results__intro-text ">
              <Body {...resultsBody} />
            </div>
          </Column>
        </Row>
      )}
      {/* TODO typing */}
      {results &&
        results.map((result: any, index: number) => {
          if (!result) return null;
          switch (result.type) {
            case "Article":
              return (
                <Row>
                  <Column md={1} lg={2}></Column>
                  <Column {...{ sm: 4, md: 6, lg: 12 }}>
                    <Entry key={result.label + index} {...result} />
                  </Column>
                </Row>
              );
            case "GlossaryTerm":
              return (
                <Row>
                  <Column md={1} lg={2}></Column>
                  <Column {...{ sm: 4, md: 6, lg: 12 }}>
                    <Entry
                      key={result.route + index}
                      externalBreadCrumb={breadcrumb}
                      {...result}
                    />
                  </Column>
                </Row>
              );
          }
        })}
    </>
  );
};
