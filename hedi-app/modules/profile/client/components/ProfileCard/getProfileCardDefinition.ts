import { getLabelInstance, IComponent } from "@/modules/components";
import { IProfileCardDefinition } from "@/modules/profile/client/components/ProfileCard/types";

export const getProfileCardDefinition = (
  components: IComponent[]
): IProfileCardDefinition => {
  return {
    distanceTemplate: getLabelInstance(components, "distanceTemplate", {
      labelKind: "span",
      text: "{d}km entfernt",
    }).text!,
    shortDistanceText: getLabelInstance(components, "shortDistanceText", {
      labelKind: "span",
      text: "weniger als {d} km entfernt",
    }).text!,
    estimatedDateText: getLabelInstance(components, "estimatedDateText", {
      labelKind: "span",
      text: "ET",
    }).text!,
  };
};
