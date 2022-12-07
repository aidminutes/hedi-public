import { MatrixMessageEvent } from "./types";

export function isMatrixMessageEvent(obj: any): obj is MatrixMessageEvent {
  return (
    obj &&
    !!obj?.event?.type &&
    typeof obj.event.type === "string" &&
    obj.event.type === "m.room.message"
  );
}
