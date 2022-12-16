import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getSelectInstance,
  getSliderInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { getProfileEntryDefinition } from "@/modules/profile/client/components";
import { getProfileCardDefinition } from "@/modules/profile/client/components/ProfileCard/getProfileCardDefinition";

export const getSearchProfileViewDefinition = (components: IComponent[]) => {
  return {
    textInput: getTextInputInstance(components, "textInput", {
      type: "text",
      labelText: "Suchbegriff",
    }),
    locationInput: getTextInputInstance(components, "locationInput", {
      type: "text",
      labelText: "Standort",
    }),
    distanceSlider: getSliderInstance(components, "distanceSlider", {
      value: 0,
      min: 0,
      max: 50,
    }),
    errorNotification: getInlineNotificationInstance(
      components,
      "errorNotification",
      { notificationKind: "error", title: "Fehler" }
    ),
    resultsHeadline: getLabelInstance(components, "headline", {
      labelKind: "h2",
      text: "Suchergebnisse",
    }),
    profileEntryDefinition: getProfileEntryDefinition(components),
    bodyText: getBodyInstance(components, "body", {}),
    callToActionHeadline: getLabelInstance(components, "callToActionHeadline", {
      text: "Durchsuche Kontakte.",
      labelKind: "h2",
    }),
    noResultNotification: getInlineNotificationInstance(
      components,
      "noResultNotification",
      { notificationKind: "error", title: "Keine Suchergebnisse" }
    ),
    noResultHint: getBodyInstance(components, "noResultHint", {
      body: "Keine Ergebnisse",
    }),
    noResultAdditionalHint: getBodyInstance(
      components,
      "noResultAdditionalHint",
      { body: "Diese Tipps haben nicht geholfen..." }
    ),
    noResultIcon: getImageInstance(components, "noResultIcon", {
      route: "",
      label: "",
      width: 400,
      height: 300,
    }),
    noResultHintHeadline: getLabelInstance(components, "noResultHintHeadline", {
      labelKind: "h3",
      text: "Vielleicht kommst du so weiter ...",
    }),
    loadingHelpText: getLabelInstance(components, "loadingHelpText", {
      labelKind: "span",
      text: "die Suche läuft",
    }),
    searchButton: getButtonInstance(components, "searchButton", {
      buttonKind: "primary",
      text: "SuchenPlaceholder",
      usage: "",
    }),
    resultsText: getLabelInstance(components, "results", {
      labelKind: "span",
      text: "Ergebnisse",
    }),
    resultsFor: getLabelInstance(components, "resultsFor", {
      labelKind: "span",
      text: "für",
    }),
    resultText: getLabelInstance(components, "result", {
      labelKind: "span",
      text: "Ergebnis",
    }),
    filterLabel: getLabelInstance(components, "filterLabel", {
      labelKind: "span",
      text: "Filter",
    }),
    toFilterLabel: getLabelInstance(components, "toFilterLabel", {
      labelKind: "span",
      text: "Filtern",
    }),
    zipcodeInput: getTextInputInstance(components, "zipcodeInput", {
      type: "text",
      labelText: "Postleitzahl",
    }),
    filterBody: getBodyInstance(components, "filterBody", {
      body: "Lorem Ipsum",
    }),
    perimeterSelect: getSelectInstance(components, "perimeterSelect", {
      labelText: "Umkreis",
      items: [
        { route: "", label: "+ 5 km" },
        { route: "", label: "+ 10 km" },
        { route: "", label: "+ 20 km" },
        { route: "", label: "+ 50 km" },
        { route: "", label: "+ 100 km" },
      ],
    }),
    zipcodeHintLabel: getLabelInstance(components, "zipcodeHintLabel", {
      labelKind: "span",
      text: "Ermittelter Standort:",
    }),
    resetLabel: getLabelInstance(components, "resetLabel", {
      labelKind: "span",
      text: "zurücksetzen",
    }),
    zipcodeErrorMessage: getLabelInstance(components, "errorMessageZipCode", {
      labelKind: "span",
      text: "Bitte geb eine gültige Postleitzahl ein.",
    }),
    profileCard: getProfileCardDefinition(components),
  };
};
