import { IPage } from "@/modules/common/types";
import { Body, InlineNotification, Label } from "@/modules/components";
import { IPersonal } from "@/modules/profile/types";
import { calculatePregnancyWeekAndDay } from "@/modules/profile/utils/calculatePregnancyWeekAndDay";
import { Column, Loading, Row } from "carbon-components-react";
import React from "react";
import { UserTile } from "../UserTile";
import { getPregnancyViewDefinition } from "./getPregnancyViewDefinition";
import { PregnancyEditModal } from "./PregnancyEditModal";
import { usePregnancy } from "./usePregnancy";

export const Pregnancy = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
}) => {
  const {
    introBody,
    myPregnancyHeadline,
    negativeAnswerLabel,
    positiveAnswerLabel,
    yourAgeLabel,
    expectedDeliveryDateLabel,
    multiplePregnancyLabel,
    prevPregnanciesHeadline,
    prevBirthLabel,
    prematureBirthLabel,
    prevBirthComplicationLabel,
    cSectionLabel,
    postpartumDepressionLabel,
    breastfeedingProblemLabel,
    userTileHealthDataHeadline,
    userTileHealthdataStateLabel,
    userTilePregnancyHeadline,
    userTilePregnancyStateLabel,
    yearsOldLabel,
    noPregnancyInlineNotification,
    pregnancyWeekLabel,
  } = getPregnancyViewDefinition(content.components);

  const {
    expectedDeliveryDate,
    multiplePregnancy,
    para,
    gravida,
    prevPrematureBirth,
    prevBirthComplication,
    prevCSection,
    prevPostpartumDepression,
    prevBreastfeedingProblem,
    error,
    localizedDate,
    isHealthdataEmpty,
    isCurrentPregnancyEmpty,
    age,
    isPregnancyEditOpen,
    isHealthyPartEditOpen,
    isPregnancyLoading,
    pregnancy,
    openPregnancyEditModalHandler,
    openHealthyPartEditModalHandler,
    closePregnancyEditModalHandler,
    closeHealthyPartEditModalHandler,
    closeModalAndReloadHandler,
  } = usePregnancy(content.lang);

  const getAnswerByBoolean = (value: boolean | undefined) => {
    if (value === undefined || value === null) return "-";
    return value ? positiveAnswerLabel.text : negativeAnswerLabel.text;
  };

  return (
    <>
      <Row className="hedi--profile__info-area">
        <Column>
          <>
            <Label {...myPregnancyHeadline} />
            <Body {...introBody} />
          </>
        </Column>
      </Row>
      <Row>
        <UserTile
          kind="Fetus"
          isEmpty={isCurrentPregnancyEmpty}
          contentHeadline={userTilePregnancyHeadline.text || ""}
          emptyStateText={userTilePregnancyStateLabel.text || ""}
          onEditClick={openPregnancyEditModalHandler}>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {yourAgeLabel.text}
            </p>
            {age ? (
              <p>
                {age} {yearsOldLabel.text}
              </p>
            ) : (
              <p>-</p>
            )}
          </div>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {expectedDeliveryDateLabel.text}
            </p>
            <p>{localizedDate}</p>
          </div>
          {localizedDate && (
            <div className="hedi--profile__info-item">
              <p className="hedi--profile__info-item-label">
                {pregnancyWeekLabel.text}
              </p>
              <p>
                {calculatePregnancyWeekAndDay(
                  pregnancy?.expectedDeliveryDate || ""
                )}
              </p>
            </div>
          )}
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {multiplePregnancyLabel.text}
            </p>
            <p>{getAnswerByBoolean(multiplePregnancy)}</p>
          </div>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {prevPregnanciesHeadline.text}
            </p>
            <p>{gravida}</p>
          </div>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {prevBirthLabel.text}
            </p>
            <p>{para}</p>
          </div>
        </UserTile>
        <UserTile
          kind="Pregnancy"
          isEmpty={isHealthdataEmpty}
          hideEditButton={isCurrentPregnancyEmpty || gravida == 0}
          contentHeadline={userTileHealthDataHeadline.text || ""}
          emptyStateText={userTileHealthdataStateLabel.text || ""}
          onEditClick={openHealthyPartEditModalHandler}>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {prematureBirthLabel.text}
            </p>
            <p>{getAnswerByBoolean(prevPrematureBirth)}</p>
          </div>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {prevBirthComplicationLabel.text}
            </p>
            <p>{getAnswerByBoolean(prevBirthComplication)}</p>
          </div>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {cSectionLabel.text}
            </p>
            <p>{getAnswerByBoolean(prevCSection)}</p>
          </div>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {postpartumDepressionLabel.text}
            </p>
            <p>{getAnswerByBoolean(prevPostpartumDepression)}</p>
          </div>
          <div className="hedi--profile__info-item">
            <p className="hedi--profile__info-item-label">
              {breastfeedingProblemLabel.text}
            </p>
            <p>{getAnswerByBoolean(prevBreastfeedingProblem)}</p>
          </div>
        </UserTile>
        {isCurrentPregnancyEmpty && isHealthdataEmpty && (
          <Column {...{ lg: 5, md: 4, sm: 2 }}>
            <InlineNotification {...noPregnancyInlineNotification} />
          </Column>
        )}
        <PregnancyEditModal
          content={content}
          isOpen={isPregnancyEditOpen}
          viewKind={"pregnancy-part"}
          onClose={closePregnancyEditModalHandler}
          onSaveSuccess={closeModalAndReloadHandler}
        />
        <PregnancyEditModal
          content={content}
          isOpen={isHealthyPartEditOpen}
          viewKind={"health-part"}
          onClose={closeHealthyPartEditModalHandler}
          title={userTileHealthDataHeadline.text}
          onSaveSuccess={closeModalAndReloadHandler}
        />
      </Row>
      {isPregnancyLoading ? <Loading /> : null}
    </>
  );
};
