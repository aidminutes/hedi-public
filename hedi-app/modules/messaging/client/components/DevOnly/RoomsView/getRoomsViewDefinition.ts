import {
  getBodyInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { getRoomListDefinition } from "../../RoomList/getRoomListDefinition";
import { IRoomsViewDefinition } from "./types";

export const getRoomsViewDefinition = (
  components: IComponent[]
): IRoomsViewDefinition => {
  return {
    headline: getLabelInstance(components, "headline", { labelKind: "h1" }),
    body: getBodyInstance(components, "body", {}),
    roomListDefinition: getRoomListDefinition(components),
  };
};
