import { IHeadlineComponent } from "@/modules/components/types/IHeadlineComponent";
import { PartialBy } from "../../../utils/typing";
import {
  ICopyLinkToClipboard,
  ICopyLinkToClipboardDefinition,
} from "../CopyLinkToClipboard/types";

export type IHeadlineWithLinkCopy = IHeadlineComponent &
  PartialBy<ICopyLinkToClipboard, "route">;

export type IHeadlineWithLinkCopyDefinition = ICopyLinkToClipboardDefinition;
