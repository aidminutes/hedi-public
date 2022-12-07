import { MatrixRoomEvent } from "./types";

export function isMatrixRoomEvent(obj: any): obj is MatrixRoomEvent {
  return (
    obj &&
    !!obj?.event?.type &&
    typeof obj.event.type === "string" &&
    obj.event.type !== "m.room.message" &&
    obj.event.type.startsWith("m.room.")
  );
}
