import {
  getInlineNotificationInstance,
  getLabelInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { getSearchMidwifeResultsDefinition } from "../SearchMidwifeResults";

export const getSearchMidwifeViewDefinition = (components: IComponent[]) => {
  return {
    servicesInput: getTextInputInstance(components, "servicesInput", {
      type: "text",
      labelText: "Angebote",
    }),
    locationInput: getTextInputInstance(components, "locationInput", {
      type: "text",
      labelText: "Standort",
    }),
    languageInput: getTextInputInstance(components, "languageInput", {
      type: "text",
      labelText: "Sprache",
    }),
    noResultNotification: getInlineNotificationInstance(
      components,
      "noResultNotification",
      { notificationKind: "error", title: "Keine Suchergebnisse" }
    ),
    errorNotification: getInlineNotificationInstance(
      components,
      "errorNotification",
      { notificationKind: "error", title: "Fehler" }
    ),
    resultsHeadline: getLabelInstance(components, "headline", {
      labelKind: "h2",
      text: "Suchergebnisse",
    }),
    midwifeSearchResultDefinition: getSearchMidwifeResultsDefinition(
      components
    ),
  };
};
