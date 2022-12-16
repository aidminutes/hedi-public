import {
  getBodyInstance,
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";

export function getSearchWithTagFilterViewDefinition(components: IComponent[]) {
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
    tagSelect: getSelectInstance(components, "tagSelect", {
      labelText: "Tags",
      items: [{ route: "bsp", label: "Beispiel" }],
    }),
    components,
  };
}
