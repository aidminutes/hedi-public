import {
  LabeledList,
  CheckboxIconType,
} from "@/modules/common/client/components/LabeledList";
import { Label } from "@/modules/components";
import {
  IProfileEntryMidwifeSearchResultContent,
  IProfileEntryMidwifeSearchResultDefinition,
} from "@/modules/profile/types";
import { useState } from "react";

export const ResultMatch: React.FC<
  IProfileEntryMidwifeSearchResultContent &
    IProfileEntryMidwifeSearchResultDefinition
> = (props): JSX.Element => {
  const {
    matchingCareTypes,
    matchingLanguages,
    matchingServices,
    isExpandable,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    matchingCareTypesLabel,
    matchingLanguagesLabel,
    matchingServicesLabel,
    showMoreLabel,
    showLessLabel,
  } = props;

  let langs = matchingLanguages.filter(item => item.matchStatus);
  let services = matchingServices.filter(item => item.matchStatus);

  let maxVisibleItemCount = langs.length;
  maxVisibleItemCount =
    services.length > maxVisibleItemCount
      ? services.length
      : maxVisibleItemCount;
  maxVisibleItemCount = maxVisibleItemCount > 3 ? maxVisibleItemCount : 3;

  let visibleItemCount = maxVisibleItemCount;
  if (!isExpanded && visibleItemCount > 3) {
    visibleItemCount = 3;
  }
  if (langs.length == 0) {
    langs = matchingLanguages.filter(item => !item.matchStatus);
    if (langs.length >= visibleItemCount) {
      langs = langs.slice(0, visibleItemCount - 1);
      langs.push({ value: "...", matchStatus: false });
    }
  }
  services.sort((a, b) => a.value.localeCompare(b.value));
  if (services.length == 0) {
    services = matchingServices.filter(item => !item.matchStatus);
    if (services.length >= visibleItemCount) {
      services = services.slice(0, visibleItemCount - 1);
      services.push({ value: "...", matchStatus: false });
    }
  }
  const toggleExpand = () => setIsExpanded(!isExpanded);
  return (
    <>
      <div className="hedi--profile-card-details-grid__column">
        <LabeledList
          labelDefinition={matchingCareTypesLabel}
          listItems={matchingCareTypes}
          isChecklist
          checklistIconType={CheckboxIconType.Outline}
          isHighlightingMatches={true}
        />
      </div>
      <div className="hedi--profile-card-details-grid__column">
        {matchingLanguages.length > 0 && (
          <LabeledList
            labelDefinition={matchingLanguagesLabel}
            listItems={langs}
            isChecklist
            toggleExpand={toggleExpand}
            maxVisibleItems={visibleItemCount}
          />
        )}
      </div>
      <div className="hedi--profile-card-details-grid__column">
        {matchingServices.length > 0 && (
          <LabeledList
            labelDefinition={matchingServicesLabel}
            listItems={services}
            isChecklist
            toggleExpand={toggleExpand}
            maxVisibleItems={visibleItemCount}
          />
        )}
      </div>

      {!isExpanded && maxVisibleItemCount > 3 ? (
        <div onClick={toggleExpand} className="footer">
          <Label {...showMoreLabel}></Label>
        </div>
      ) : isExpanded && maxVisibleItemCount > 3 ? (
        <div onClick={toggleExpand} className="footer">
          <Label {...showLessLabel}></Label>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
