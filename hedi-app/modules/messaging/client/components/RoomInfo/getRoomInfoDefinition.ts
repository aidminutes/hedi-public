import { getLabelInstance, getLinkInstance, IComponent } from "@/modules/components";
import { getFormatDateRelativeDefinition } from "../../utils/dateFormat/getFormatDateRelativeDefinition";
import { getCallEventDefinition } from "../CallEvent/getCallEventDefinition";
import { getMessageEventDescDefinition } from "../MessageEvent/getMessageEventDescDefinition";
import { getRoomEventDefinition } from "../RoomEvent/getRoomEventDefinition";
import { IRoomInfoDefinition } from "./types";

export const getRoomInfoDefinition = (
  components: IComponent[]
): IRoomInfoDefinition => {
  return {
    conversationRoute: getLinkInstance(components, "conversationLink", {
      href: "/de/konversation",
      labelText: "Unterhaltung",
    }).href,
    messageEventDescDefinition: getMessageEventDescDefinition(components),
    roomEventDefinition: getRoomEventDefinition(components),
    callEventDefinition: getCallEventDefinition(components),
    formatDateRelativeDefinition: getFormatDateRelativeDefinition(components),
    noMembersYetLabel: getLabelInstance(components, "noMembersYetLabel", {
      labelKind: "span",
      text: "noch keine Teilnehmer:innen"
    }).text ?? "noch keine Teilnehmer:innen"
  };
};
