import {
  IComponent,
  getLabelInstance,
  getSelectInstance,
} from "@/modules/components";
import { ICareTypeInputDefinition } from "./CareTypeInput";

export const getCareTypeInputDefinition = (
  components: IComponent[]
): ICareTypeInputDefinition => {
  const definition = {
    careTypesLabel: getLabelInstance(components, "careTypesLabel", {
      labelKind: "h3",
      text: "Betreuungsarten",
    }),
    careTypeSelect: getSelectInstance(components, "careTypeSelect", {
      items: [
        {
          route: "/profilecaretype/prenatalcare",
          label: "Vorsorge",
        },
        {
          route: "/profilecaretype/deliverycare",
          label: "Geburtsbegleitung",
        },
        {
          route: "/profilecaretype/postpartumcare",
          label: "Wochenbett",
        },
      ],
    }),
    careTypesTitle: getLabelInstance(components, "careTypesTitle", {
      labelKind: "span",
      text: "Betreuungsart",
    }),
  };
  return definition;
};
