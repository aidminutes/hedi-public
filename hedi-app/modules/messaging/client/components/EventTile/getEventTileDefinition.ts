import { IComponent } from "@/modules/components";
import { getFormatDateRelativeDefinition } from "../../utils/dateFormat/getFormatDateRelativeDefinition";
import { getCallEventDefinition } from "../CallEvent/getCallEventDefinition";
import { getMessageEventDefinition } from "../MessageEvent/getMessageEventDefinition";
import { getRoomEventDefinition } from "../RoomEvent/getRoomEventDefinition";
import { IEventTileDefinition } from "./types";

export const getEventTileDefinition = (
  components: IComponent[]
): IEventTileDefinition => {
  return {
    messageEventDefinition: getMessageEventDefinition(components),
    roomEventDefinition: getRoomEventDefinition(components),
    callEventDefinition: getCallEventDefinition(components),
    formatDateRelativeDefinition: getFormatDateRelativeDefinition(components),
  };
};
