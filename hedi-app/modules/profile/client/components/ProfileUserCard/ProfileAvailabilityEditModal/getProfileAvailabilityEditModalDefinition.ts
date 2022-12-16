import {
  getBodyInstance,
  getLabelInstance,
  IBodyComponent,
  IComponent,
  ILabelComponent,
} from "@/modules/components";
import {
  getConsultationHoursInputDefinition,
  IConsultationHoursInputDefinition,
} from "../../ConsultationHoursInput";
export interface IEditAvailability {
  modalAvailabilityHeadlineLabel: ILabelComponent;
  editAvailabilityIntroBody: IBodyComponent;
  consultationHoursDefinition: IConsultationHoursInputDefinition;
}

export const getProfileAvailabilityEditModalDefinition = (
  components: IComponent[]
): IEditAvailability => ({
  consultationHoursDefinition: getConsultationHoursInputDefinition(components),
  modalAvailabilityHeadlineLabel: getLabelInstance(
    components,
    "modalAvailabilityHeadlineLabel",
    { labelKind: "span", text: "Erreichbarkeit" }
  ),
  editAvailabilityIntroBody: getBodyInstance(
    components,
    "editAvailabilityIntroBody",
    {
      body:
        "<p>Hinterlege Zeiten, in denen du besonders gut zu erreichen bist. Diese Einstellung kann ebenfalls verdeutlichen, dass du außerhalb dieser Zeiten nicht immer erreichbar bist. Nutze sie, wenn du sie als hilfreich empfindest.</p>",
    }
  ),
});
