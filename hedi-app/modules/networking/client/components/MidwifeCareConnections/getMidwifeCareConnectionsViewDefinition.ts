import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getLinkInstance,
  getSelectInstance,
  IComponent,
} from "@/modules/components";
import { getFormatDateRelativeDefinition } from "@/modules/messaging/client/utils/dateFormat/getFormatDateRelativeDefinition";
import { getProfileEntryMidwifeSearchResultDefinition } from "@/modules/profile/client/components";

export const getMidwifeCareConnectionsViewDefinition = (
  components: IComponent[]
) => {
  return {
    careRequestLink: getLinkInstance(components, "careRequestLink", {
      labelText: "Hebammenanfrage",
      href: "de/hebammenanfrage",
    }),
    careRequestHeadline: getLabelInstance(components, "careRequestHeadline", {
      labelKind: "h4",
      text: "Überschrift",
    }),
    careRequestHeadlinePersonal: getLabelInstance(
      components,
      "careRequestHeadlinePersonal",
      {
        labelKind: "h4",
        text: "Personal Überschrift",
      }
    ),
    careRequestIntroText: getBodyInstance(components, "careRequestIntroText", {
      body: "<p>Hier steht der Intro Text.</p>",
    }),
    careRequestIntroTextPersonal: getBodyInstance(
      components,
      "careRequestIntroTextPersonal",
      {
        body: "<p>Hier steht der Personal Intro Text.</p>",
      }
    ),
    careRequestWelcomeNotification: getInlineNotificationInstance(
      components,
      "careRequestWelcomeNotification",
      { title: "Schön", notificationKind: "info" }
    ),
    emptyStateText: getBodyInstance(components, "emptyStateText", {
      body: "Empty State Text",
    }),
    emptyStateImage: getImageInstance(components, "emptyStateImage", {
      width: 160,
      height: 120,
      route: "",
      label: "",
    }),
    emptyStateSettingsText: getBodyInstance(
      components,
      "emptyStateSettingsText",
      { body: "Settings" }
    ),
    emptyStateSettingsImage: getImageInstance(
      components,
      "emptyStateSettingsImage",
      {
        width: 160,
        height: 120,
        route: "",
        label: "",
      }
    ),
    emptyStateSettingsButton: getButtonInstance(
      components,
      "emptyStateSettingsButton",
      { buttonKind: "primary", usage: "" }
    ),
    estimatedDateText: getLabelInstance(components, "estimatedDateText", {
      labelKind: "span",
      text: "ET",
    }),
    formatDateRelativeDefinition: getFormatDateRelativeDefinition(components),
    detailsLabel: getLabelInstance(components, "detailsLabel", {
      labelKind: "span",
      text: "Details",
    }),
    careTypeSelect: getSelectInstance(components, "careTypeSelect", {
      items: [],
    }),
    midwifeSearchResultDefinition: getProfileEntryMidwifeSearchResultDefinition(
      components
    ),
    distanceTemplate: getLabelInstance(components, "distanceTemplate", {
      labelKind: "span",
      text: "{d}km entfernt",
    }).text!,
    emptyStatePersonalText: getBodyInstance(
      components,
      "emptyStatePersonalText",
      { body: "<p>Text</p>" }
    ),
    emptyStatePersonalButton: getButtonInstance(
      components,
      "emptyStatePersonalButton",
      { usage: "", buttonKind: "primary", labelText: "Hebamme suchen" }
    ),
    withdrawnConnectionHint: getLabelInstance(
      components,
      "withdrawnConnectionHint",
      { labelKind: "p", text: "Diese Anfrage wurde von dir zurückgezogen." }
    ),
    emptyStatePersonalActiveText: getBodyInstance(
      components,
      "emptyStatePersonalActiveText",
      {
        body: "<p>Juhu! Du hast eine Hebamme gefunden.</p>",
      }
    ),
    emptyStatePersonalActiveButton: getButtonInstance(
      components,
      "emptyStatePersonalActiveButton",
      { usage: "", buttonKind: "ghost", labelText: "Zur aktiven Betreuung" }
    ),
    openStateLabel: getLabelInstance(components, "openStateLabel", {
      labelKind: "span",
      text: "offen",
    }),

    chatLabel: getLabelInstance(components, "chatLabel", {
      labelKind: "span",
      text: "Nachricht",
    }),

    conversationLink: getLinkInstance(components, "conversationLink", {
      labelText: "Link",
      href: "/",
    }),
    archiveHeadlineLabel: getLabelInstance(components, "archiveHeadlineLabel", {
      labelKind: "h3",
      text: "Archiv",
    }),
    archiveBody: getBodyInstance(components, "archiveBody", { body: "" }),
    emptyStateArchiveText: getBodyInstance(
      components,
      "emptyStateArchiveText",
      { body: "<p>Die Liste der von dir abgesagten Anfragen ist leer.</p>" }
    ),
  };
};
