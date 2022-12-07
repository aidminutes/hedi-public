import { getLinkInstance, IComponent } from "@/modules/components";
import { getRoomViewDefinition } from "../RoomView";
import { IConversationViewDefinition } from "./types";

export const getConversationViewDefinition = (
  components: IComponent[]
): IConversationViewDefinition => {
  return {
    roomViewDefinition: getRoomViewDefinition(components),
  };
};
