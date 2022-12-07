import { IPage } from "@/modules/common/types";
import { IPersonal } from "@/modules/profile/types";
import { calculatePregnancyWeekAndDay } from "@/modules/profile/utils/calculatePregnancyWeekAndDay";
import { Column, Loading, Row } from "carbon-components-react";
import React, { ReactNode } from "react";
import { getPregnancyViewDefinition } from "./../getPregnancyViewDefinition";
import { usePregnancyCompact } from "./usePregnancyCompact";

export const PregnancyCompact = ({
  content,
  profile,
  children,
}: {
  content: Pick<IPage, "lang" | "components">;
  profile?: IPersonal;
  children?: ReactNode;
}) => {
  const {
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
    yearsOldLabel,
    pregnancyWeekLabel,
  } = getPregnancyViewDefinition(content.components);

  const {
    multiplePregnancy,
    para,
    gravida,
    prevPrematureBirth,
    prevBirthComplication,
    prevCSection,
    prevPostpartumDepression,
    prevBreastfeedingProblem,
    localizedDate,
    age,
    isPregnancyLoading,
    pregnancy,
  } = usePregnancyCompact(content.lang, profile);

  const getAnswerByBoolean = (value: boolean | undefined) => {
    if (value === undefined) return "-";
    return value ? positiveAnswerLabel.text : negativeAnswerLabel.text;
  };

  return (
    <>
      <div className="">
        <label className="bx--label inline-label">{yourAgeLabel.text}</label>
        {age ? (
          <span>
            {age} {yearsOldLabel.text}
          </span>
        ) : (
          <span>-</span>
        )}
      </div>
      <div className="">
        <label className="bx--label inline-label">
          {expectedDeliveryDateLabel.text}
        </label>
        <span>{localizedDate}</span>
      </div>
      <div>
        <label className="bx--label inline-label">
          {pregnancyWeekLabel.text}
        </label>
        <span>
          {calculatePregnancyWeekAndDay(pregnancy?.expectedDeliveryDate || "")}
        </span>
      </div>
      <div className="">
        <label className="bx--label inline-label">
          {multiplePregnancyLabel.text}
        </label>
        <span>{getAnswerByBoolean(multiplePregnancy)}</span>
      </div>
      <div className="">
        <label className="bx--label inline-label">
          {prevPregnanciesHeadline.text}
        </label>
        <span>{gravida}</span>
      </div>
      <div className=" mb-07">
        <label className="bx--label inline-label">{prevBirthLabel.text}</label>
        <span>{para}</span>
      </div>

      <div className="">
        <label className="bx--label inline-label">
          {prematureBirthLabel.text}
        </label>
        <span>{getAnswerByBoolean(prevPrematureBirth)}</span>
      </div>
      <div className="">
        <label className="bx--label inline-label">
          {prevBirthComplicationLabel.text}
        </label>
        <span>{getAnswerByBoolean(prevBirthComplication)}</span>
      </div>
      <div className="">
        <label className="bx--label inline-label">{cSectionLabel.text}</label>
        <span>{getAnswerByBoolean(prevCSection)}</span>
      </div>
      <div className="">
        <label className="bx--label inline-label">
          {postpartumDepressionLabel.text}
        </label>
        <span>{getAnswerByBoolean(prevPostpartumDepression)}</span>
      </div>
      <div className="mb-07">
        <label className="bx--label inline-label">
          {breastfeedingProblemLabel.text}
        </label>
        <span>{getAnswerByBoolean(prevBreastfeedingProblem)}</span>
      </div>

      {isPregnancyLoading ? <Loading /> : null}
      {children}
    </>
  );
};
