import { MatrixCallEvent } from "./types";

export function isMatrixCallEvent(obj: any): obj is MatrixCallEvent {
  return (
    obj &&
    !!obj?.event?.type &&
    typeof obj.event.type === "string" &&
    obj.event.type.startsWith("m.call.")
  );
}
