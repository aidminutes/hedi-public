import { isIArticle } from "@/modules/editorial/article/types";
import { isIGlossaryTerm } from "@/modules/editorial/glossary/types";
import { isIBusinessProfile } from "@/modules/profile/types";
import { ISuggestionEntry } from "./types";

export function transformSuggestionEntry(props: ISuggestionEntry) {
  const {
    element,
    children,
    alternativeClass,
    clickHandler,
    entryType,
    articleLabel,
    glossaryLabel,
  } = props;
  const { type, label, route } = element;
  const profession = isIBusinessProfile(element) ? element.profession : null;
  const translation = isIGlossaryTerm(element)
    ? element.lang !== "de"
      ? element.translations.find(t => t.lang === "de")?.label ||
        "hier fehlt was"
      : null
    : null;
  const summary = isIArticle(element)
    ? element.summary
    : isIGlossaryTerm(element)
    ? element.body
    : null;

  const addClass = alternativeClass
    ? `hedi--suggestion-entry--${alternativeClass}`
    : `hedi--suggestion-entry--quicksearch`;

  const wrapperClass = `hedi--suggestion-entry  hedi--suggestion-entry--${type.toLocaleLowerCase()} ${addClass}`;
  return {
    wrapperClass,
    entryHeadline: profession
      ? profession.label
      : type === "GlossaryTerm"
      ? glossaryLabel.text
      : articleLabel.text,
    label,
    children,
    clickHandler,
    route,
    profession,
    summary,
    entryType: entryType || "short",
    translation,
  };
}
