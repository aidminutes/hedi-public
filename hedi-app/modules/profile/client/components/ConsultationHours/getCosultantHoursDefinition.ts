import { IComponent, findLabelInstance } from "@/modules/components/types";
import { IConsultationHoursDefinition } from ".";

export const getCosultantHoursDefinition = (
  components: IComponent[]
): IConsultationHoursDefinition => {
  return {
    headline:
      findLabelInstance(components, "consultationHours")?.text ??
      "Sprechzeiten",
  };
};
