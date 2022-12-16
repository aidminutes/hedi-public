import { isIState } from "@/modules/model";
import { MidwifeCareRequest } from ".";

export type MidwifeCareRequestEntry = Omit<MidwifeCareRequest, "recipients">;

export function isMidwifeCareRequestEntry(
  obj: any
): obj is MidwifeCareRequestEntry {
  return obj && typeof obj.route === "string" && isIState(obj.state);
}
