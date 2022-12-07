import { IComponent } from "@/modules/components";
import { getRoomInfoDefinition } from "../RoomInfo/getRoomInfoDefinition";
import { IRoomListDefinition } from "./types";

// export const getRoomListDefinition = (components: IComponent[]) => getRoomInfoDefinition(components) as IRoomListDefinition;

export const getRoomListDefinition = getRoomInfoDefinition;
