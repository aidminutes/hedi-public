import {
  getBodyInstance,
  getImageInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getLinkInstance,
  IComponent,
} from "@/modules/components";

export function getSearchResultDefinitions(components: IComponent[]) {
  return {
    resultsHeadline: getLabelInstance(components, "headline", {
      labelKind: "h2",
      text: "Suchergebnisse",
    }),
    glossaryLink: getLinkInstance(components, "glossarylink", {
      href: "",
      labelText: "Glossar",
    }),
    noResultNotification: getInlineNotificationInstance(
      components,
      "searchError",
      { title: "Keine Suchergebnisse", notificationKind: "error" }
    ),
    noResultHint: getBodyInstance(components, "noResultHint", {}),
    noResultIcon: getImageInstance(components, "noResultIcon", {
      route: "",
      label: "",
      width: 100,
      height: 100,
    }),
    noResultHintHeadline: getLabelInstance(components, "noResultHintHeadline", {
      labelKind: "h3",
      text: "Vielleicht kommst du so weiter ...",
    }),
    resultsBody: getBodyInstance(components, "bodyResults", {}),
    allArticle: getLabelInstance(components, "allArticle", {
      labelKind: "span",
      text: "Alle Artikel",
    }),
    resultsText: getLabelInstance(components, "results", {
      labelKind: "span",
      text: "Ergebnisse",
    }),
    resultText: getLabelInstance(components, "result", {
      labelKind: "span",
      text: "Ergebnis",
    }),
    resultsFor: getLabelInstance(components, "resultsFor", {
      labelKind: "span",
      text: "für",
    }),
  };
}
