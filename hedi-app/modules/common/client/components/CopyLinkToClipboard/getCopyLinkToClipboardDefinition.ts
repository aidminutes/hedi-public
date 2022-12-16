import {
  getInlineNotificationInstance,
  IComponent,
} from "@/modules/components/types";
import { ICopyLinkToClipboardDefinition } from "./types";

export const getCopyLinkToClipboardDefinition = (
  components: IComponent[]
): ICopyLinkToClipboardDefinition => {
  return {
    notificationText: getInlineNotificationInstance(
      components,
      "copyLinkNotificationText",
      { notificationKind: "success", title: "Link wurde kopiert" }
    ).title,
  };
};
