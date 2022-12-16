import {
  Column,
  InlineLoading,
  Loading,
  Row,
  Tooltip,
} from "carbon-components-react";
import { Body, Button, Label } from "@/modules/components";
import { CheckboxButton, Seperator } from "@/modules/common/client/components";
import { ICareType } from "@/modules/networking/types/ICareType";
import { ISearchMidwifeResultProps } from "../../../types";
import { DebugInfo } from "../Debug/DebugInfo";
import { useSearchMidwifeResults } from "./useSearchMidwifeResults";
import { SelectWindow24, Send24 } from "@carbon/icons-react";
import {
  ProfileCard,
  ProfileCardType,
} from "@/modules/profile/client/components/ProfileCard";
import { ResultMatch } from "@/modules/profile/client/components/ProfileCard/ResultMatch";
import { selectPrimaryData } from "@/modules/profile/utils";
import cx from "classnames";
import { ProfileCardDetailsGrid } from "@/modules/profile/client/components/ProfileCard/ProfileCardDetailsGrid";
import { parseMatches } from "./parseMatches";
import {
  columnWidth,
  offsetColumnWidth,
} from "../SearchMidwife/SearchMidwifeWidget/columnHelper";
import {
  hasActiveCareRequest,
  isUnderCare,
} from "@/modules/networking/utils/connections";

export const SearchMidwifeResults = (props: ISearchMidwifeResultProps) => {
  const {
    isLoading,
    profileResults,
    queryCareTypes,
    queryLanguages,
    queryServices,
    debug,
    lang,
    careRequestUrl,
    careTypeSelect,
    isPartOfWizard,
    wizard,
    careConnections,
    ...definition
  } = props;
  const {
    resultsUpdatingLabel,
    midwifeSearchResultDefinition,
    sendRequestButton,
    requestCheckboxButtonDefinition,
    selectedMidwifesLabel,
    firstSelectionHintBody,
    midwifeSearchNoResultsDefinition,
    activeCareLabel,
    whyMidwifeUserCouldNotSelectMidwivesTooltipBody,
  } = definition;
  const {
    isMidwifeUser,
    selectedCount,
    handleRequestCheck,
    handleRequestCreate,
    selection,
    isFirstSelection,
    selectedMidwifesLabelText,
    isCreatingRequest,
  } = useSearchMidwifeResults({
    rawSelectedMidwifesLabelText: selectedMidwifesLabel.text || "",
    queryCareTypes,
    queryLanguages,
    queryServices,
    lang,
    careRequestUrl,
    profileResults,
    isPartOfWizard,
    wizard,
  });

  return (
    <>
      <Row>
        <Column {...offsetColumnWidth} />
        <Column {...columnWidth}>
          <div className="hedi--search-midwife__send-request">
            {!!isLoading ? (
              <InlineLoading description={resultsUpdatingLabel.text} />
            ) : null}
          </div>
        </Column>
      </Row>
      <Row>
        <Column {...offsetColumnWidth} />
        <Column {...columnWidth}>
          <Seperator color="blue" type="xs" />
        </Column>
        <Column {...offsetColumnWidth} />
      </Row>
      <div className="hedi--search-midwife__result-list">
        {profileResults
          .map(profile =>
            parseMatches(
              profile,
              queryCareTypes,
              careTypeSelect?.items as ICareType[],
              queryLanguages,
              queryServices
            )
          )
          .map(profile => {
            const hasUserActiveRequestWithMidwife = hasActiveCareRequest(
              profile.route,
              careConnections
            );
            let isUserUnderCareWithMidwife = isUnderCare(
              profile.route,
              careConnections
            );
            return (
              <Row>
                <Column {...offsetColumnWidth} />
                <Column {...columnWidth}>
                  {debug && (
                    <DebugInfo
                      showDebugInfo={true}
                      debugInfo={profile.scoreDetails}
                    />
                  )}
                  <ProfileCard
                    isExpandable={true}
                    key={profile.route}
                    className={cx({
                      isSelected: selection[profile.route] === true,
                    })}
                    title={profile.label}
                    showImage={true}
                    image={profile.image}
                    profileType={ProfileCardType.PROFESSIONAL}
                    href={profile.route}
                    distanceInKm={profile.geoDistance}
                    address={selectPrimaryData(profile.addresses)}
                    renderInteractionArea={() =>
                      isMidwifeUser ? null : (
                        <CheckboxButton
                          onChange={c => handleRequestCheck(c, profile.route)}
                          {...requestCheckboxButtonDefinition}
                          checked={selection[profile.route] === true}
                          showTooltip={isFirstSelection}
                          tooltipText={firstSelectionHintBody}
                          isDisabled={hasUserActiveRequestWithMidwife}
                          disabledText={
                            isUserUnderCareWithMidwife
                              ? activeCareLabel.text
                              : undefined
                          }
                        />
                      )
                    }
                    renderDetails={() => (
                      <ProfileCardDetailsGrid smallFirstColumn>
                        <ResultMatch
                          {...midwifeSearchResultDefinition}
                          {...profile}
                          isExpandable={true}
                        />
                      </ProfileCardDetailsGrid>
                    )}
                  />
                </Column>
              </Row>
            );
          })}

        <Row>
          <Column {...offsetColumnWidth} />
          <Column {...columnWidth}>
            <div className="hedi--search-midwife__send-request hedi--search-midwife__send-request__text">
              <Label
                {...{
                  text: selectedMidwifesLabelText,
                  labelKind: "Label",
                }}></Label>
            </div>
          </Column>
        </Row>
        <Row>
          <Column {...offsetColumnWidth} />
          <Column {...columnWidth}>
            <div className="hedi--search-midwife__send-request">
              {isMidwifeUser ? (
                <div className="hedi--search-midwife__send-request__tooltip">
                  <Tooltip align="end">
                    <Body
                      {...whyMidwifeUserCouldNotSelectMidwivesTooltipBody}
                    />
                  </Tooltip>
                </div>
              ) : null}
              <Button
                {...sendRequestButton}
                disabled={selectedCount == 0 || isMidwifeUser}
                renderIcon={selectedCount > 0 ? Send24 : SelectWindow24}
                onClick={() => handleRequestCreate()}
              />
            </div>
          </Column>
        </Row>
      </div>

      {isCreatingRequest ? <Loading /> : null}
    </>
  );
};
