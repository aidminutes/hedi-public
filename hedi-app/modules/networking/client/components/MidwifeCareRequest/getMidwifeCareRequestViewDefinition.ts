import {
  getBodyInstance,
  getButtonInstance,
  getGroupInstance,
  getLabelInstance,
  getLinkInstance,
  getTextAreaInstance,
  IComponent,
} from "@/modules/components";
import { getFormatDateRelativeDefinition } from "@/modules/messaging/client/utils/dateFormat/getFormatDateRelativeDefinition";
import { getPregnancyViewDefinition } from "@/modules/profile/client/components/Pregnancy/getPregnancyViewDefinition";

export const getMidwifeCareRequestViewDefinition = (
  components: IComponent[]
) => {
  return {
    noResultsLabel: getLabelInstance(components, "noResultsLabel", {
      text: "Anfrage nicht gefunden. :(",
      labelKind: "p",
    }),
    requestHeadline: getLabelInstance(components, "requestHeadline", {
      text: "Betreuungsanfrage",
      labelKind: "h4",
    }),
    requestHeadlinePersonal: getLabelInstance(
      components,
      "requestHeadlinePersonal",
      { labelKind: "h4", text: "Deine Anfrage im Detail" }
    ),
    requestBodyPersonal: getBodyInstance(components, "requestBodyPersonal", {
      body:
        "<p>Erhalte einen Überblick, welche deiner angefragten Leistungen diese Hebamme abdecken könnte und welche Informationen diese Hebamme von dir erhalten hat.</p>",
    }),
    profileHeadlineClient: getLabelInstance(
      components,
      "profileHeadlineClient",
      {
        text: "Profil der Klient:in",
        labelKind: "h4",
      }
    ),
    profileHeadlineUser: getLabelInstance(components, "profileHeadlineUser", {
      text: "Profil der Nutzer:in",
      labelKind: "h4",
    }),
    profileBodyPending: getBodyInstance(components, "profileBodyPending", {
      body:
        "<p>Die Klientin stellt dir folgende weitere Informationen zur Verfügung.<br/>Du hast noch Rückfragen, bevor du dich entscheiden kannst? Sende eine Nachricht.</p>",
    }),
    profileBodyActive: getBodyInstance(components, "profileBodyActive", {
      body:
        "<p>Lies Informationen zu deiner Klient:in und ihrer Schwangerschaft nach.<br/>Sende ihr eine Nachricht und schließe beendete Betreuungen ab.</p>",
    }),
    requestDateLabel: getLabelInstance(components, "requestDateLabel", {
      labelKind: "p",
      text: "Anfrage vom",
    }),
    searchedCareHeadline: getLabelInstance(components, "searchedCareHeadline", {
      labelKind: "span",
      text: "Gesuchte Betreuung",
    }),
    messageHeadline: getLabelInstance(components, "messageHeadline", {
      labelKind: "span",
      text: "Nachricht",
    }),
    careTypeLabel: getLabelInstance(components, "careTypeLabel", {
      labelKind: "p",
      text: "Betreuungsform",
      className: "hedi--midwife-care-request-view__label",
    }),
    languageLabel: getLabelInstance(components, "languageLabel", {
      labelKind: "p",
      text: "Sprache",
      className: "hedi--midwife-care-request-view__label",
    }),
    serviceLabel: getLabelInstance(components, "serviceLabel", {
      labelKind: "p",
      text: "Weitere Leistung",
      className: "hedi--midwife-care-request-view__label",
    }),
    profileLabel: getLabelInstance(components, "profileLabel", {
      labelKind: "p",
      text: "Personen- und Schwangerschaftsprofil",
      className: "hedi--midwife-care-request-view__label",
    }),
    locationLabel: getLabelInstance(components, "locationLabel", {
      labelKind: "p",
      text: "Ort",
      className: "hedi--midwife-care-request-view__label",
    }),
    streetLabel: getLabelInstance(components, "streetLabel", {
      labelKind: "p",
      text: "Straße",
      className: "hedi--midwife-care-request-view__label",
    }),
    distanceLabel: getLabelInstance(components, "distanceLabel", {
      labelKind: "p",
      text: "Entfernung",
      className: "hedi--midwife-care-request-view__label",
    }),
    sendMessageButton: getButtonInstance(components, "sendMessageButton", {
      usage: "",
      buttonKind: "ghost",
      labelText: "Nachricht senden",
    }),
    additionalInfoLabel: getLabelInstance(components, "additionalInfoLabel", {
      labelKind: "p",
      text: "Ergänzende Information",
      className: "hedi--midwife-care-request-view__label",
    }),
    pregnancyLabel: getLabelInstance(components, "pregnancyLabel", {
      text: "Schwangerschaft",
      labelKind: "h5",
    }),
    careTypeHeadline: getLabelInstance(components, "careTypeHeadline", {
      text: "Suche folgende Betreuung",
      labelKind: "h5",
    }),
    serviceHeadline: getLabelInstance(components, "serviceHeadline", {
      text: "Suche folgende Zusatzangebote",
      labelKind: "h5",
    }),
    languageHeadline: getLabelInstance(components, "languageHeadline", {
      text: "Sprachen",
      labelKind: "h5",
    }),
    sendRequestButton: getButtonInstance(components, "sendRequestButton", {
      buttonKind: "primary",
      text: "Anfrage senden",
      usage: "send request",
    }),
    careRequestMessage: getTextAreaInstance(components, "careRequestMessage", {
      placeholder: "Placeholder für Text Area",
    }),
    userTileProfileCardLabel: getLabelInstance(
      components,
      "userTileProfileCardLabel",
      { labelKind: "span", text: "Visitenkarte" }
    ),
    nameLabel: getLabelInstance(components, "nameLabel", {
      labelKind: "span",
      text: "Name",
    }),
    emailLabel: getLabelInstance(components, "emailLabel", {
      labelKind: "span",
      text: "E-Mail",
    }),
    tabRequestLabel: getLabelInstance(components, "tabRequestLabel", {
      labelKind: "span",
      text: "Anfrage",
    }),
    tabRequestPersonalLabel: getLabelInstance(
      components,
      "tabRequestPersonalLabel",
      {
        labelKind: "span",
        text: "Anfragedetails",
      }
    ),

    tabProfileLabel: getLabelInstance(components, "tabProfileLabel", {
      labelKind: "span",
      text: "Profil",
    }),
    clientAge: getLabelInstance(components, "clientAge", {
      labelKind: "span",
      text: "Alter der Klientin",
    }),
    formatDateRelativeDefinition: getFormatDateRelativeDefinition(components),
    ...getPregnancyViewDefinition(components),
    distanceTemplate: getLabelInstance(components, "distanceTemplate", {
      labelKind: "span",
      text: "{d}km entfernt",
    }).text!,
    midwifeProfile: getButtonInstance(components, "midwifeProfile", {
      labelText: "Hebammenprofil",
      usage: "",
      buttonKind: "ghost",
    }),
    matchingRequestHeadline: getLabelInstance(
      components,
      "matchingRequestHeadline",
      { labelKind: "span", text: "Übereinstimmung mit der Anfrage" }
    ),
    profileCardLink: getLinkInstance(components, "profileCardLink", {
      href: "",
      labelText: "Deine Visitenkarte",
    }),
    pregnancyLink: getLinkInstance(components, "pregnancyLink", {
      href: "",
      labelText: "Dein Schwangerschaftsprofil",
    }),
    sendInformationHeadline: getLabelInstance(
      components,
      "sendInformationHeadline",
      { labelKind: "span", text: "Gesendete Informationen" }
    ),
    careHeadlinePersonal: getLabelInstance(components, "careHeadlinePersonal", {
      labelKind: "h4",
      text: "Deine Betreuung im Detail",
    }),
    careBodyPersonal: getBodyInstance(components, "careBodyPersonal", {
      body:
        "<p>Erhalte einen Überblick, welche Leistungen du von deine Hebamme erhältst und welche Informationen sie von dir erhalten hat.</p>",
    }),
    tabCarePersonalLabel: getLabelInstance(components, "tabCarePersonalLabel", {
      labelKind: "span",
      text: "Details",
    }),
    matchingCareHeadline: getLabelInstance(components, "matchingCareHeadline", {
      labelKind: "span",
      text: "Dein Betreuungsumfang",
    }),
    tabCareLabel: getLabelInstance(components, "tabCareLabel", {
      labelKind: "span",
      text: "Betreuung",
    }),
    careHeadline: getLabelInstance(components, "careHeadline", {
      text: "Betreuungsinformation",
      labelKind: "h4",
    }),
    servicesCareHeadline: getLabelInstance(components, "servicesCareHeadline", {
      labelKind: "span",
      text: "Gewünschte Leistungen",
    }),
    midwifeRequestDetailsBody: getBodyInstance(
      components,
      "midwifeRequestDetailsBody",
      { body: "<p>Hier steht body Text</p>" }
    ),
    servicesTileTitleLabel: getLabelInstance(
      components,
      "servicesTileTitleLabel",
      {
        labelKind: "span",
        text: "Betreuungsart, Leistungen & Services",
      }
    ),
    allServices: getGroupInstance(components, "serviceSelect", {
      usage: "",
      labelText: "Leistungen",
      components: [],
    }),
    servicesLabel: getLabelInstance(components, "servicesLabel", {
      labelKind: "label",
      text: "Weitere Leistungen & Services",
    }),
    servicesCareTypesTitleLabel: getLabelInstance(
      components,
      "servicesCareTypesTitleLabel",
      {
        labelKind: "label",
        text: "Angebotene Betreuungform",
      }
    ),
    serviceGroupRecipientEmptyStateLabel: getLabelInstance(
      components,
      "serviceGroupRecipientEmptyStateLabel",
      {
        labelKind: "span",
        text: "Diese Hebamme bietet keine Leistungen in dieser Kategorie an.",
      }
    ),
    userTileAvailabilityHeadlineLabel: getLabelInstance(
      components,
      "userTileAvailabilityHeadlineLabel",
      { labelKind: "span", text: "Erreichbarkeit" }
    ),
    pregnancyWeekAbbreviationLabel: getLabelInstance(
      components,
      "pregnancyWeekAbbreviationLabel",
      { labelKind: "span", text: "Ssw" }
    ),
    pregnancyWeekLabel: getLabelInstance(components, "pregnancyWeekLabel", {
      labelKind: "span",
      text: "Schwangerschaftswoche",
    }),
  };
};
