import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getLabelInstance,
  getLinkInstance,
  IComponent,
} from "@/modules/components";
import { getFormatDateRelativeDefinition } from "@/modules/messaging/client/utils/dateFormat/getFormatDateRelativeDefinition";

export const getMidwifeCaresViewDefinition = (components: IComponent[]) => {
  return {
    caresMidwifeHeadline: getLabelInstance(components, "caresMidwifeHeadline", {
      labelKind: "h3",
      text: "Laufende Betreuungen",
    }),
    caresMidwifeBody: getBodyInstance(components, "caresMidwifeBody", {
      body: "<p>Verwalte deine laufenden und beendeten Betreuungen.</p>",
    }),
    caresPersonalHeadline: getLabelInstance(components, "caresClientHeadline", {
      labelKind: "h3",
      text: "Deine Hebammen",
    }),
    caresPersonalBody: getBodyInstance(components, "caresClientBody", {
      body: "<p>Diese Hebammen betreuen dich in deiner Schwangerschaft.</p>",
    }),
    formatDateRelativeDefinition: getFormatDateRelativeDefinition(components),
    detailsLabel: getLabelInstance(components, "detailsLabel", {
      labelKind: "span",
      text: "Details",
    }),
    careTypesLabel: getLabelInstance(components, "careTypesLabel", {
      labelKind: "span",
      text: "Betreuungsform",
    }),
    servicesLabel: getLabelInstance(components, "servicesLabel", {
      labelKind: "span",
      text: "Leistungen",
    }),
    languageLabel: getLabelInstance(components, "languageLabel", {
      labelKind: "span",
      text: "Sprache",
    }),
    birthesInLabel: getLabelInstance(components, "birthesInLabel", {
      labelKind: "span",
      text: "Geburten im",
    }),
    careRequestUrl: getLinkInstance(components, "careRequestUrl", {
      href: "",
      labelText: "",
    }).href,
    emptyStatePersonalText: getBodyInstance(
      components,
      "emptyStatePersonalText",
      {
        body:
          "<p>Zurzeit hast du noch keine Hebamme gefunden. Überprüfe den Status deiner laufenden Anfragen oder starte eine Hebammensuche.</p>",
      }
    ),
    emptyStateMidwifeText: getBodyInstance(
      components,
      "emptyStateMidwifeText",
      {
        body:
          "<p>Du hast zur Zeit keine geplanten oder laufenden Betreuungen über HEDI angenommen. Nehme Direkt- oder Netzwerk-Anfragen an, um eine Betreuung anzubieten.</p>",
      }
    ),
    emptyStateMidwifeImage: getImageInstance(
      components,
      "emptyStateMidwifeImage",
      {
        width: 160,
        height: 120,
        route: "",
        label: "",
      }
    ),
    emptyStateMidwifeButton: getButtonInstance(
      components,
      "emptyStateMidwifeButton",
      {
        usage: "",
        labelText: "Offene Anfragen",
        buttonKind: "primary",
      }
    ),
    emptyStatePersonalButtonOne: getButtonInstance(
      components,
      "emptyStatePersonalButtonOne",
      { usage: "", buttonKind: "primary", labelText: "Meine Anfragen" }
    ),
    emptyStatePersonalButtonTwo: getButtonInstance(
      components,
      "emptyStatePersonalButtonTwo",
      { usage: "", buttonKind: "ghost", labelText: "Neue Hebammensuche" }
    ),
    estimatedDateText: getLabelInstance(components, "estimatedDateText", {
      labelKind: "span",
      text: "ET",
    }),
    conversationLink: getLinkInstance(components, "conversationLink", {
      labelText: "Link",
      href: "/",
    }),
    chatLabel: getLabelInstance(components, "chatLabel", {
      labelKind: "span",
      text: "Nachricht",
    }),
  };
};
