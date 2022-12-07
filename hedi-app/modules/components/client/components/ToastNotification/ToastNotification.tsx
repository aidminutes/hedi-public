import React from "react";
import {
  IToastNotificationProps,
  transformToastNotification,
} from "./transformToastNotification";
import { ToastNotification as CarbonToastNotification } from "carbon-components-react";
export const ToastNotification = (props: IToastNotificationProps) => {
  const data = transformToastNotification(props);
  return <CarbonToastNotification {...data}></CarbonToastNotification>;
};
