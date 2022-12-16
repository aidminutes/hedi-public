import { ICallDefinition } from "../Call";
import { IFileSharingDefinition } from "../FileSharing/types";
import {
  IMessageComposerConfig,
  IMessageComposerDefinition,
} from "../MessageComposer";
import { IRoomHeaderDefinition } from "../RoomHeader";
import { ITimelineDefinition } from "../Timeline/types";

export type IRoomView = IRoomViewContent &
  IRoomViewDefinition &
  IRoomViewConfig;

export interface IRoomViewContent {
  roomId: string;
}

export interface IRoomViewDefinition {
  roomHeaderDefinition: IRoomHeaderDefinition;
  timelineDefinition: ITimelineDefinition;
  messageComposerDefinition: IMessageComposerDefinition;
  callDefinition: ICallDefinition;
}

export type IRoomViewConfig = IMessageComposerConfig;
