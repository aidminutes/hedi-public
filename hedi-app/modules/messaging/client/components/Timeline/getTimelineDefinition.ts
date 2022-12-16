import { getLabelInstance, IComponent } from "@/modules/components";
import { getFormatDateRelativeDefinition } from "../../utils/dateFormat/getFormatDateRelativeDefinition";
import { getEventTileDefinition } from "../EventTile/getEventTileDefinition";
import { ITimelineDefinition } from "./types";

export const getTimelineDefinition = (
  components: IComponent[]
): ITimelineDefinition => {
  return {
    newMessagesText:
      getLabelInstance(components, "newMessages", {
        labelKind: "span",
        text: "Neue Nachrichten",
      }).text ?? "Neue Nachrichten",
    eventTileDefinition: getEventTileDefinition(components),
    formatDateRelativeDefinition: getFormatDateRelativeDefinition(components),
  };
};
