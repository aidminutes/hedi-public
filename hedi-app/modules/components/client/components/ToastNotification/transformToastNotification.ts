import { IToastNotificationComponent } from "../../../types";
import { ToastNotificationProps } from "carbon-components-react";
import { HTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";

export type IToastNotificationProps = PartialBy<
  IToastNotificationComponent,
  "kind"
> &
  Omit<
    ToastNotificationProps,
    "id" | "subtitle" | "title" | "kind" | "caption"
  >;

export function transformToastNotification(
  props: IToastNotificationProps
): ToastNotificationProps {
  const {
    kind,
    notificationKind,
    caption,
    lowContrast,
    hideCloseButton,
    title,
    subtitle,
    ariaRole,
    ...rest
  } = props;

  // TODO what todo with aria-role?
  return {
    kind: notificationKind,
    caption,
    lowContrast: lowContrast || true,
    hideCloseButton: hideCloseButton || true,
    title,
    subtitle: HTML({ data: subtitle }),
    ...rest,
  };
}
