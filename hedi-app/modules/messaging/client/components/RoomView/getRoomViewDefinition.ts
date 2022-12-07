import { IComponent } from "@/modules/components";
import { IRoomViewDefinition } from "./types";
import { getMessageComposerDefinition } from "../MessageComposer/getMessageComposerDefinition";
import { getTimelineDefinition } from "../Timeline/getTimelineDefinition";
import { getCallDefinition } from "../Call";
import { getRoomHeaderDefinition } from "../RoomHeader";

export const getRoomViewDefinition = (
  components: IComponent[]
): IRoomViewDefinition => {
  return {
    roomHeaderDefinition: getRoomHeaderDefinition(components),
    timelineDefinition: getTimelineDefinition(components),
    messageComposerDefinition: getMessageComposerDefinition(components),
    callDefinition: getCallDefinition(components),
  };
};
