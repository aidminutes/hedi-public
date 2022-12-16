import {
  getImageInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IServicesDefinition } from "./Services";
export function getServicesDefinition(
  components: IComponent[]
): IServicesDefinition {
  return {
    organisation: {
      title: getLabelInstance(components, "servicesOrganisation", {
        labelKind: "h2",
        text: "Leistungs-Spektrum",
      }),
    },
    professional: {
      title: getLabelInstance(components, "servicesProfessional", {
        labelKind: "h2",
        text: "Leistungen + Services",
      }),
    },
  };
}
