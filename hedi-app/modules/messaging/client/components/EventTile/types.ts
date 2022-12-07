import { MatrixEvent } from "matrix-js-sdk/lib/models/event";
import { IFormatDateRelativeDefinition } from "../../utils/dateFormat/types";
import { ICallEventDefinition } from "../CallEvent/types";
import {
  IMessageEventConfig,
  IMessageEventDefinition,
} from "../MessageEvent/types";
import { IRoomEventDefinition } from "../RoomEvent/types";

export type IEventTile = IEventTileContent &
  IEventTileDefinition &
  IEventTileConfig;

export interface IEventTileContent {
  event: MatrixEvent;
  isOwnEvent?: boolean;
}

export interface IEventTileConfig extends IMessageEventConfig {
  locale?: string;
  hideUnknownEvents?: boolean;
}

export interface IEventTileDefinition {
  messageEventDefinition: IMessageEventDefinition;
  roomEventDefinition: IRoomEventDefinition;
  callEventDefinition: ICallEventDefinition;
  formatDateRelativeDefinition: IFormatDateRelativeDefinition;
}
