import { HTML } from "@/modules/react/html";
import React from "react";
import { transformSuggestionEntry } from "./transformSuggestionEntry";
import { ISuggestionEntry } from "./types";

export const SuggestionEntry = (props: ISuggestionEntry) => {
  const {
    wrapperClass,
    entryHeadline,
    label,
    children,
    clickHandler,
    route,
    entryType,
    summary,
    translation,
  } = transformSuggestionEntry(props);
  return (
    <div
      className={wrapperClass}
      onClick={() => (clickHandler ? clickHandler(route) : null)}>
      <p>{entryHeadline}</p>
      <h3>{label}</h3>
      {entryType === "full" && translation && (
        <p className="hedi--glossary-term__marked-translation">{translation}</p>
      )}
      {entryType === "full" && summary && (
        <div className="hedi--suggestion-entry--summary">
          <HTML data={summary} />
        </div>
      )}
      {children}
    </div>
  );
};
