import { IInlineNotificationComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { InlineNotificationProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type IInlineNotificationProps = PartialBy<
  IInlineNotificationComponent,
  "kind"
> &
  Omit<InlineNotificationProps, "id" | "subtitle" | "title" | "kind">;

export function transformInlineNotification(
  props: IInlineNotificationProps
): InlineNotificationProps {
  const {
    title,
    subtitle,
    notificationKind,
    lowContrast,
    hideCloseButton,
  } = props;

  // TODria-roleO how to handle a
  return {
    kind: notificationKind,
    title,
    subtitle: BasicHTML({ data: subtitle }),
    lowContrast: lowContrast ?? true,
    hideCloseButton: hideCloseButton ?? true,
  };
}
