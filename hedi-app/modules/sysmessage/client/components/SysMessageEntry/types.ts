import { IButtonComponent } from "@/modules/components";
import { ISysMessage } from "../../../types";

export type SysMessageEntryKind = "SysMessageEntry" | "Popup"; // TODO different types of entry kind

export interface ISysMessageEntryDefinition {
  markAsReadButton: IButtonComponent;
  dismissButton: IButtonComponent;
}

export interface ISysMessageEntryProps extends ISysMessage {
  kind?: SysMessageEntryKind;
}
