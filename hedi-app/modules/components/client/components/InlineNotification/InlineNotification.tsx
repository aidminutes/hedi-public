import React from "react";
import {
  transformInlineNotification,
  IInlineNotificationProps,
} from "./transformInlineNotification";
import { InlineNotification as CarbonInlieNotification } from "carbon-components-react";

export const InlineNotification = (props: IInlineNotificationProps) => {
  const data = transformInlineNotification(props);
  return <CarbonInlieNotification {...data} />;
};
