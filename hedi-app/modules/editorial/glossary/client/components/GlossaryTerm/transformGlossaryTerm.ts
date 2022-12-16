import { ICopyLinkToClipboard } from "@/modules/common/client/components/CopyLinkToClipboard/types";
import { AssertClientSide } from "@/modules/common/utils";
import { IHeadlineComponent } from "@/modules/components";
import { IGlossaryTerm, IGlossaryViewDefinition } from "../../../types";

export type IGlossaryTermProps = {} & IGlossaryTermConfig &
  IGlossaryTermDefiniton;
export interface IGlossaryTermDefiniton {
  notificationText: string;
}
export interface IGlossaryTermConfig {
  glossaryTerm: IGlossaryTerm;
  lang?: string;
  isSelected?: boolean;
}

export function transformGlossaryTerm(props: IGlossaryTermProps) {
  const { glossaryTerm, lang, isSelected, notificationText } = props;
  const { label, body, route } = glossaryTerm;
  const entryId = AssertClientSide()
    ? window.location.hash.substr(1)
    : undefined;

  const germanTerm = lang == "de" ? null : glossaryTerm.germanTerm;

  const termClass = isSelected
    ? "hedi--glossary-term hedi--glossary-term__marked-word"
    : "hedi--glossary-term";
  const glossaryTermId = route.split("/").pop();
  const glossaryTermWithSlash = "/" + glossaryTermId;
  const headline: IHeadlineComponent & ICopyLinkToClipboard = {
    kind: "Headline",
    headline: "h3",
    text: label,
    route: route.replace(glossaryTermWithSlash, ""),
    type: "icon",
    size: "sm",
    anchor: glossaryTermId,
    // TODO HACK get from cms
    notificationText,
  };
  const routeWithAnchor = route.replace(
    glossaryTermWithSlash,
    "#" + glossaryTermId
  );
  return {
    glossaryTermId,
    label,
    body,
    entryId,
    isSelected,
    termClass,
    germanTerm,
    route: routeWithAnchor,
    headline,
  };
}
