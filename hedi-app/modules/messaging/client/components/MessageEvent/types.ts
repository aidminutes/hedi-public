import { IEvent, MatrixEvent } from "matrix-js-sdk/lib/models/event";
import { IImageDetailDefinition } from "../ImageDetail/types";
import { ITimelineSuggestionEntryDefinition } from "../TimelineSuggestionEntry/types";

export type IMessageEvent = IMessageEventContent &
  IMessageEventDefinition &
  IMessageEventConfig;

export type MessageEventType = `m.room.message`;

export type MatrixMessageEvent = MatrixEvent & {
  event: Partial<IEvent> & { type: MessageEventType };
};

export interface IMessageEventContent {
  event: MatrixMessageEvent;
  isOwnEvent?: boolean;
  formattedEventDate?: string;
}

export interface IMessageEventDefinition {
  imageDetailDefinition: IImageDetailDefinition;
  suggestionEntryDefinition: ITimelineSuggestionEntryDefinition;
}

// NOTE unlike Call- or Room event descriptions are not (yet) required for Message event
// since messageEvents display the whole message body
// used in RoomInfo to display a 'summary'
export interface IMessageEventDescDefinition {
  fileText: string;
  imageText: string;
  hediLinkText: string;
}

export interface IMessageEventConfig {
  isFirstInGroup: boolean;
  sideSwap: boolean;
  read: boolean;
  onImageLoaded: () => void;
}
