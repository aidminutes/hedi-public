import {
  getGroupInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IServicesInputDefinition } from ".";

export const getServicesInputDefinition = (
  components: IComponent[]
): IServicesInputDefinition => {
  return {
    serviceSelectGroup: getGroupInstance(components, "serviceSelect", {
      usage: "",
      labelText: "Angebote",
      components: [],
    }),
    addServiceLabel: getLabelInstance(components, "addService", {
      labelKind: "span",
      text: "Hinzufügen",
    }),
  };
};
