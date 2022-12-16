import {
  getButtonInstance,
  getTextAreaInstance,
  IComponent,
} from "@/modules/components";
import { getCallFileSharingDefinition } from "../FileSharing";
import { getQuickSearchDefinition } from "../QuickSearch";
import { IMessageComposerDefinition } from "./types";

export const getMessageComposerDefinition = (
  components: IComponent[]
): IMessageComposerDefinition => {
  return {
    quickSearchDefinition: getQuickSearchDefinition(components),
    fileSharingDefinition: getCallFileSharingDefinition(components),
    quickSearchButton: getButtonInstance(components, "quickSearchButton", {
      type: "button",
      buttonKind: "primary",
      usage: "",
    }),
    textArea: getTextAreaInstance(components, "textArea", {}),
    sendButton: getButtonInstance(components, "sendButton", {
      type: "submit",
      buttonKind: "primary",
      usage: "",
    }),
    shareButton: getButtonInstance(components, "shareButton", {
      type: "button",
      buttonKind: "primary",
      usage: "",
    }),
  };
};
