import { Room } from "matrix-js-sdk/lib/models/room";
import { IFormatDateRelativeDefinition } from "../../utils/dateFormat/types";
import { IEventTileConfig, IEventTileDefinition } from "../EventTile/types";

export type ITimeline = ITimelineContent &
  ITimelineDefinition &
  ITimelineConfig;

export interface ITimelineContent {
  room: Room;
}

export interface ITimelineDefinition {
  newMessagesText: string;
  eventTileDefinition: IEventTileDefinition;
  formatDateRelativeDefinition: IFormatDateRelativeDefinition;
}

export interface ITimelineConfig
  extends Pick<IEventTileConfig, "locale" | "hideUnknownEvents"> {}
