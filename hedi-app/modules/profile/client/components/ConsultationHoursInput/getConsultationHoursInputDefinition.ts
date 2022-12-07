import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IConsultationHoursInputDefinition } from ".";
import { getConsultationHourInputDefinition } from "./ConsultationHourInput";

export const getConsultationHoursInputDefinition = (
  components: IComponent[]
): IConsultationHoursInputDefinition => {
  const consultationHourInputDefinition = getConsultationHourInputDefinition(
    components
  );
  return {
    consultationHoursLabel: getLabelInstance(components, "consultationHours", {
      labelKind: "span",
      text: "Erreichbarkeit",
    })!,
    weekdayTitle: consultationHourInputDefinition.weekdayTitle,
    startTimeTitle: consultationHourInputDefinition.startTimeTitle,
    endTimeTitle: consultationHourInputDefinition.endTimeTitle,
    availabilityTitle: consultationHourInputDefinition.availabilityTitle,
    consultationHourInputDefinition,
    addButton: getButtonInstance(components, "consultationHourAddButton", {
      buttonKind: "tertiary",
      usage: "",
      text: "Zeiten hinzufügen",
    }),
    removeButton: getButtonInstance(
      components,
      "consultationHourRemoveButton",
      {
        buttonKind: "ghost",
        usage: "",
        text: "Entfernen",
      }
    ),
  };
};
