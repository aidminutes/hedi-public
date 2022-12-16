import { IEvent, MatrixEvent } from "matrix-js-sdk/lib/models/event";

export type IRoomEvent = IRoomEventContent & IRoomEventDefinition;

export type RoomEventType = `m.room.${string}`;

export type MatrixRoomEvent = MatrixEvent & {
  event: Partial<IEvent> & { type: RoomEventType };
};

export interface IRoomEventContent {
  event: MatrixRoomEvent;
  formattedEventDate?: string;
}

export interface IRoomEventDefinition extends IRoomEventDescDefinition {}

export interface IRoomEventDescDefinition {
  roomCreatedText: string;
}
