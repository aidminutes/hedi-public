import {
  getBodyInstance,
  getButtonInstance,
  getLabelInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";

export function getSearchViewDefinition(components: IComponent[]) {
  return {
    bodyText: getBodyInstance(components, "body", {}),
    callToActionHeadline: getLabelInstance(components, "callToActionHeadline", {
      text: "Nach Artikeln suchen",
      labelKind: "h2",
    }),
    searchInput: getTextInputInstance(components, "searchInput", {
      type: "text",
      labelText: "Artikel Suchen",
    }),
    loadingHelpText: getLabelInstance(components, "loadingHelpText", {
      labelKind: "span",
      text: "die Suche läuft",
    }),
    components,
    introText: getBodyInstance(components, "introText", {}),
    searchButton: getButtonInstance(components, "searchButton", {
      buttonKind: "primary",
      text: "SuchenPlaceholder",
      usage: "",
    }),
  };
}
