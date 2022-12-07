import { getLabelInstance, IComponent } from "@/modules/components";
import { IRoomEventDefinition } from "./types";

export const getRoomEventDefinition = (
  components: IComponent[]
): IRoomEventDefinition => {
  return {
    roomCreatedText:
      getLabelInstance(components, "roomCreated", {
        labelKind: "span",
        text: "Raum erstellt",
      }).text ?? "Raum erstellt",
  };
};
