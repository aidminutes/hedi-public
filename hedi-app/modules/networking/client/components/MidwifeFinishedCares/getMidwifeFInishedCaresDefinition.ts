import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { getFormatDateRelativeDefinition } from "@/modules/messaging/client/utils/dateFormat/getFormatDateRelativeDefinition";

export const getMidwifeFinishedCaresDefinition = (components: IComponent[]) => {
  return {
    finishedCaresMidwifeHeadline: getLabelInstance(
      components,
      "finishedCaresMidwifeHeadline",
      {
        labelKind: "h3",
        text: "Beendete Betreuungen",
      }
    ),
    formatDateRelativeDefinition: getFormatDateRelativeDefinition(components),
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
    estimatedDateText: getLabelInstance(components, "estimatedDateText", {
      labelKind: "span",
      text: "ET",
    }),
    emptyStateFinishedCareText: getBodyInstance(
      components,
      "emptyStateFinishedCareText",
      {
        body:
          "<p>Du hast zur Zeit keine abgeschlossenen oder abgebrochenen Betreuungen. Schließe laufende Betreuungen ab, um sie hier zu archivieren.</p>",
      }
    ),
    emptyStateFinishedCareButton: getButtonInstance(
      components,
      "emptyStateFinishedCareButton",
      { usage: "", buttonKind: "ghost", labelText: "Aktive Betreuungen" }
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
  };
};
