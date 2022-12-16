import { Room } from "matrix-js-sdk/lib/models/room";
import { IRoomInfoDefinition } from "../RoomInfo/types";

export type IRoomList = IRoomListDefinition & IRoomListConfig;

export interface IRoomListDefinition extends IRoomInfoDefinition {}
export interface IRoomListConfig {
  locale?: string;
  filter?: (room: Room) => boolean;
  setIsLoggedIn?: Function;
}
