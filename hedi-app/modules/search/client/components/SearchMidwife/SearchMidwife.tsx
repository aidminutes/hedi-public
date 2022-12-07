import { Column, Grid, Row } from "carbon-components-react";
import {
  findLinkInstance,
  IBodyComponent,
  ILabelComponent,
} from "@/modules/components";
import { IPage } from "@/modules/common/types";

import { useSearchMidwifeView } from "./useSearchMidwifeView";
import { getSearchMidwifeDefinition } from "./getSearchMidwifeDefinition";
import {
  SearchMidwifeInput,
  ISearchMidwifeInputDefinition,
} from "./SearchMidwifeInput";
import { SearchMidwifeResults } from "../SearchMidwifeResults";
import {
  DebugMidwifeSearchResultView,
  DebugScoreMultiplierInput,
  useDebugView,
} from "../Debug";

export interface ISearchMidwifeViewDefinition {
  headlineLabel: ILabelComponent;
  introText: IBodyComponent;
  inputDefinition: ISearchMidwifeInputDefinition &
    ISearchMidwifeWidgetDefinition;
  resultsDefinition: ISearchMidwifeResultsDefinition;
  midwifeSearchNoResultsDefinition: ISearchMidwifeNoResultsDefinition;
}
import useKonamiCode from "../SearchMidwife/useKonamiCode";
import { ISearchMidwifeResultsDefinition } from "@/modules/search/types";

import { ISearchMidwifeWidgetDefinition } from "./SearchMidwifeWidget/getSearchMidwifeWidgetDefinition";
import { removeHTMLTags } from "@/modules/common/utils";
import { InfoBar } from "@/modules/common/client/components/InfoBar";
import {
  columnWidth,
  offsetColumnWidth,
} from "./SearchMidwifeWidget/columnHelper";
import { SearchMidwifeNoResults } from "./SearchMidwifeNoResults";
import { ISearchMidwifeNoResultsDefinition } from "./SearchMidwifeNoResults/getSearchMidwifeNoResultsDefinition";
export const SearchMidwife = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard" | "wizard">;
}) => {
  const { lang, components, isPartOfWizard, wizard } = content;
  const {
    headlineLabel,
    introText,
    inputDefinition,
    resultsDefinition,
    midwifeSearchNoResultsDefinition,
  } = getSearchMidwifeDefinition(components);
  const {
    handleSearchInputChange,
    handleScoreMultiplierChange,
    languageCounts,
    serviceCounts,
    searchResults,
    resultsCount,
    isLoading,
    isPageLoad,
    careConnections,
    isMidwifeUser,
    queryCareTypes,
  } = useSearchMidwifeView(lang, wizard);
  const careRequestUrl = findLinkInstance(components, "careRequestLink")?.href;
  const isDebugView = false;
  const handleNetworkRequest = () => wizard?.next();

  return (
    <div className="hedi--search-midwife">
      {isMidwifeUser ? (
        <InfoBar
          theme="orange"
          text={removeHTMLTags(
            resultsDefinition.whyMidwifeUserCouldNotSelectMidwivesTooltipBody
              .body
          )}
        />
      ) : null}
      <Grid className="hedi--search-midwife__input-grid">
        <SearchMidwifeInput
          languageCounts={languageCounts}
          serviceCounts={serviceCounts}
          onChange={handleSearchInputChange}
          lang={lang}
          components={components}
          isPartOfWizard={isPartOfWizard}
          wizard={wizard}
          resultProfiles={searchResults?.profileResults}
          resultsCount={resultsCount}
          isLoading={isLoading}
          isPageLoad={isPageLoad}
          {...inputDefinition}
        />
        <Row>
          <Column>{/* Errors here */}</Column>
        </Row>
        {isDebugView && (
          <DebugScoreMultiplierInput onChange={handleScoreMultiplierChange} />
        )}
      </Grid>
      <Grid>
        {searchResults && (
          <>
            {isDebugView ? (
              <DebugMidwifeSearchResultView
                lang={content.lang}
                careRequestUrl={careRequestUrl}
                {...searchResults}
                {...resultsDefinition}
                careTypeSelect={inputDefinition.careTypeSelect}
              />
            ) : (
              <SearchMidwifeResults
                isLoading={isLoading}
                lang={content.lang}
                careRequestUrl={careRequestUrl}
                {...searchResults}
                {...resultsDefinition}
                careTypeSelect={inputDefinition.careTypeSelect}
                isPartOfWizard={isPartOfWizard}
                wizard={wizard}
                careConnections={careConnections}
              />
            )}
          </>
        )}

        {!isLoading && !isPageLoad && !searchResults && resultsCount === 0 && (
          <Row>
            <Column {...offsetColumnWidth} />
            <Column {...columnWidth}>
              <SearchMidwifeNoResults
                {...midwifeSearchNoResultsDefinition}
                hasCareTypes={queryCareTypes && queryCareTypes?.length > 0}
                onNetworkRequest={handleNetworkRequest}
              />
            </Column>
          </Row>
        )}
      </Grid>
    </div>
  );
};
