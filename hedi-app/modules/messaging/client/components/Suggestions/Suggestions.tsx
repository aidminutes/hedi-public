import { CountedTag } from "@/modules/common/client/components";
import React from "react";
import { SuggestionEntry } from "../SuggestionEntry";
import { ISuggestions } from "./types";
import { useTypes } from "./useTypes";

export const Suggestions = (props: ISuggestions) => {
  const {
    elements,
    searchIsActive,
    handleElementSelection,
    suggestionEntryDefinition,
  } = props;
  const { typeCounts, typeFilteredElements, handleTypeSelection } = useTypes(
    elements,
    searchIsActive,
    suggestionEntryDefinition
  );
  return (
    <div className="hedi--quick-suggestionWrapper">
      <div className="hedi--quick-suggestion__tags">
        {typeCounts &&
          typeCounts.map((element, index) => (
            <CountedTag
              defaultChecked={true}
              key={element.elementType ?? element.label + index}
              {...element}
              onChange={handleTypeSelection}
            />
          ))}
      </div>
      {typeFilteredElements && typeFilteredElements.length > 0 && (
        <div className="hedi--quick-suggestion__list">
          {typeFilteredElements.map((element, index) => (
            <SuggestionEntry
              {...suggestionEntryDefinition}
              clickHandler={handleElementSelection}
              {...{ element }}
              key={element.label + index}
            />
          ))}
        </div>
      )}
    </div>
  );
};
