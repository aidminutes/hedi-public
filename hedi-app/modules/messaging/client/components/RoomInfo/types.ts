import { Room } from "matrix-js-sdk";
import { IFormatDateRelativeDefinition } from "../../utils/dateFormat/types";
import { ICallEventDefinition } from "../CallEvent/types";
import { IMessageEventDescDefinition } from "../MessageEvent/types";
import { IRoomEventDefinition } from "../RoomEvent/types";

export type IRoomInfo = IRoomInfoContent &
  IRoomInfoDefinition &
  IRoomInfoConfig;

export interface IRoomInfoContent {
  room: Room;
}

export interface IRoomInfoDefinition {
  conversationRoute: string;
  messageEventDescDefinition: IMessageEventDescDefinition;
  roomEventDefinition: IRoomEventDefinition;
  callEventDefinition: ICallEventDefinition;
  formatDateRelativeDefinition: IFormatDateRelativeDefinition;
  noMembersYetLabel: string
}

export interface IRoomInfoConfig {
  locale?: string;
}
