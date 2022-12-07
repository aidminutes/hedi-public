import { IPage } from "@/modules/common/types";
import {
  Checkbox,
  Label,
  Button,
  Toggle,
  TextArea,
  Image,
  ToastNotification,
  InlineNotification,
} from "@/modules/components";
import { UserTile } from "@/modules/profile/client/components";
import { ProfileUserCardCompact } from "@/modules/profile/client/components/ProfileUserCard/ProfileUserCardCompact/ProfileUserCardCompact";
import { HediPersonRound } from "@/modules/svg/client/components/HediPersonRound";
import { InformationFilled16 } from "@carbon/icons-react";
import { Column, InlineLoading, Row, Tooltip } from "carbon-components-react";

import React from "react";
import { SearchMidwifeStates } from "../SearchMidwifeWizard/StateManagement";
import { getSearchMidwifeConfirmationDefinition } from "./getSearchMidwifeConfirmationDefinition";
import { useSearchMidwifeConfirmation } from "./useSearchMidwifeConfirmation";
import { PregnancyCompact } from "@/modules/profile/client/components/Pregnancy/PregnancyCompact/PregnancyCompact";
import { IPersonal } from "@/modules/profile/types";
import { Seperator } from "@/modules/common/client/components";

export const SearchMidwifeConfirmation = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard" | "wizard">;
}) => {
  const { isPartOfWizard, wizard } = content;

  const {
    headline,
    pageDescriptionLabel,
    searchedCaresLabel,
    forLabel,
    expectedDeliveryDateShortFormLabel,
    withServicesLabel,
    selectedMidwivesLabel,
    networkRequestToggle,
    requestInformationLabel,
    freeTextTitleLabel,
    freeTextDescriptionLabel,
    freeTextTextArea,
    freeTextInfoLabel,
    sendButton,
    cancelButton,
    languageSelect,
    careTypesSelect,
    allServices,
    theseInfoWillBeSentLabel,
    profileCardTitleLabel,
    pregnancyTitleLabel,
    errorNotification,
    duplicateRequestErrorNotification,
    noRecipientNotification,
    tooLongMessageNotification,
    networkRequestTooltipText,
    underCareOrHasActiveConnectionLabel,
  } = getSearchMidwifeConfirmationDefinition(content.components);

  const {
    profile,
    postalCode,
    expectedDeliveryDate,
    careTypes,
    languages,
    services,
    midwives,
    usedFreeTextChars,
    maxFreeTextLength,
    freeTextChangeHandler,
    sendRequestHandler,
    cancelRequestHandler,
    profileSelectionChangeHandler,
    isNetworkRequest,
    networkRequestChangeHandler,
    isSaving,
    hasSaveError,
    hasNoRecipient,
    duplicateRecipients,
  } = useSearchMidwifeConfirmation(content.lang, content.wizard);

  return (
    <>
      <div className="hedi--search-midwife-confirmation">
        <div className="hedi--search-midwife-confirmation__section">
          <Label {...headline} labelKind="h3" />
          <div className="hedi--search-midwife-confirmation__intro-text">
            <Label {...pageDescriptionLabel} />
          </div>
        </div>
        <div className="hedi--search-midwife-confirmation__section">
          <Row className="mb-05">
            <Column>
              <Label {...searchedCaresLabel} />
            </Column>
          </Row>
          <Row>
            <Column>
              <div className="hedi--search-midwife-confirmation__short hedi--search-midwife-confirmation__for">
                <Label {...forLabel} />{" "}
                {[
                  postalCode,
                  expectedDeliveryDateShortFormLabel.text +
                    " " +
                    expectedDeliveryDate,
                  careTypes
                    .map(
                      ct =>
                        careTypesSelect.items.find(x => x.route == ct)?.label
                    )
                    .join(", "),
                ]
                  .filter(x => x)
                  .join(" | ")}
              </div>
              {(languages.length > 0 || services.length > 0) && (
                <div className="hedi--search-midwife-confirmation__short">
                  <Label {...withServicesLabel} />{" "}
                  {languages
                    .map(
                      langRoute =>
                        languageSelect.items.find(x => x.route == langRoute)
                          ?.label
                    )
                    .concat(
                      services.map(
                        serviceRoute =>
                          allServices.find(x => x.route == serviceRoute)?.label
                      )
                    )
                    .join(" | ")}
                </div>
              )}
            </Column>
          </Row>
        </div>

        <div className="hedi--search-midwife-confirmation__section">
          <Row className="mb-05">
            <Column>
              <Label {...selectedMidwivesLabel} />
            </Column>
          </Row>
          <Row>
            <Column>
              {midwives.map((midProfile, i) => (
                <div className="hedi--search-midwife-confirmation__midwife-entry">
                  <div className="hedi--user-sidenavbar__user-image">
                    {midProfile.image ? (
                      <Image
                        {...midProfile.image}
                        className="round-image small-avatar"
                      />
                    ) : (
                      <HediPersonRound />
                    )}
                  </div>
                  <div className="">
                    <a target="_blank" href={midProfile.route}>
                      {midProfile.label}
                    </a>
                  </div>
                  <Checkbox
                    id={midProfile.route}
                    labelText={
                      midProfile.isDisabled
                        ? underCareOrHasActiveConnectionLabel.text || ""
                        : ""
                    }
                    checked={midProfile.isSelected}
                    onChange={(checked: boolean) =>
                      profileSelectionChangeHandler(checked, i)
                    }
                    disabled={midProfile.isDisabled}
                  />
                </div>
              ))}
            </Column>
          </Row>
          {/* TODO wieder einbauen, wenn Network Request aktuell wird */}
          {/* <Row>
            <Column className="hedi--search-midwife-confirmation__toggle">
              <Toggle
                {...networkRequestToggle}
                labelText=""
                defaultToggled={isNetworkRequest}
                onChange={networkRequestChangeHandler}
              />
              <Tooltip align="end">{networkRequestTooltipText.text}</Tooltip>
            </Column>
          </Row> */}
        </div>
        <div className="hedi--search-midwife-confirmation__section">
          <Row className="mb-05">
            <Column>
              <Label {...requestInformationLabel} />
            </Column>
          </Row>
          <Row>
            <UserTile
              emptyStateText=""
              kind="Contact"
              contentHeadline={profileCardTitleLabel.text ?? ""}
              isEmpty={false}
              columns="half"
              hasBorder={true}
              onEditClick={() => wizard?.back(SearchMidwifeStates.VISIT_CARD)}>
              {profile ? (
                <ProfileUserCardCompact
                  content={content}
                  profile={profile || undefined}>
                  <div className="hedi--search-midwife-confirmation__additional-info">
                    <InformationFilled16 />
                    <label className="bx--label">
                      {theseInfoWillBeSentLabel.text}
                    </label>
                  </div>
                </ProfileUserCardCompact>
              ) : (
                <InlineLoading />
              )}
            </UserTile>

            <UserTile
              emptyStateText=""
              kind="Pregnancy"
              contentHeadline={pregnancyTitleLabel.text ?? ""}
              isEmpty={false}
              hasBorder={true}
              columns="half"
              onEditClick={() =>
                wizard?.back(SearchMidwifeStates.PRAGNANCY_DATA)
              }>
              {profile ? (
                <PregnancyCompact
                  content={content}
                  profile={profile as IPersonal}>
                  <div className="hedi--search-midwife-confirmation__additional-info">
                    <InformationFilled16 />
                    <label className="bx--label">
                      {theseInfoWillBeSentLabel.text}
                    </label>
                  </div>
                </PregnancyCompact>
              ) : (
                <InlineLoading />
              )}
            </UserTile>
          </Row>
        </div>
        <div className="hedi--search-midwife-confirmation__section">
          <Row>
            <Column className="mb-07">
              <Label {...freeTextTitleLabel} className="mb-05" />
              <div className="hedi--search-midwife-confirmation__freetext-description">
                <Label {...freeTextDescriptionLabel} />
                <span>{usedFreeTextChars + "/" + maxFreeTextLength}</span>
              </div>
              <TextArea
                {...freeTextTextArea}
                onChange={e => freeTextChangeHandler(e.target.value)}
              />
              {usedFreeTextChars > maxFreeTextLength ? (
                <div>
                  <InlineNotification {...tooLongMessageNotification} />
                </div>
              ) : null}
              <div className="hedi--search-midwife-confirmation__additional-info">
                <InformationFilled16 />
                <Label {...freeTextInfoLabel} />
              </div>
            </Column>
          </Row>
          {hasSaveError ? (
            <Row>
              <Column>
                {duplicateRecipients.length ? (
                  <ToastNotification {...duplicateRequestErrorNotification}>
                    <ul className="hedi--search-midwife-confirmation__duplicate-recipient-list">
                      {duplicateRecipients.map(profileRoute => (
                        <li>
                          {midwives.find(m => m.route == profileRoute)?.label}
                        </li>
                      ))}
                    </ul>
                  </ToastNotification>
                ) : (
                  <ToastNotification {...errorNotification} />
                )}
              </Column>
            </Row>
          ) : null}
          {hasNoRecipient ? (
            <Row>
              <Column>
                <InlineNotification {...noRecipientNotification} />
              </Column>
            </Row>
          ) : null}
        </div>
        <Seperator type="l" />
        <Row>
          <Column className="hedi--search-midwife-confirmation__button-container">
            <Button
              {...cancelButton}
              onClick={cancelRequestHandler}
              className="hedi--button--centered"
            />
            {isSaving ? (
              <div className="hedi--centered">
                <InlineLoading />
              </div>
            ) : (
              <Button
                {...sendButton}
                onClick={sendRequestHandler}
                className="hedi--button--centered"
                disabled={
                  hasNoRecipient || usedFreeTextChars > maxFreeTextLength
                }
              />
            )}
          </Column>
        </Row>
      </div>
    </>
  );
};
