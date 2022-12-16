import React, { createContext, useContext, useRef, useState } from "react";
import { useUser } from "@/modules/auth/client/hooks";
import { AssertClientSide } from "@/modules/common/utils";
import { useRouter } from "next/router";
import { INotification } from "@/modules/pwr/types/INotification";

const DEFAULT_NOTIFICATION_MAX_LENGTH = 30;

export interface INotificationContext {
  sendNotification(notification: INotification): void;
  queueNotification(notification: INotification): void;
  requestPermission(): Promise<boolean>;
  flushNotificationQueue(): Promise<void>;
}

export const NotificationContext = createContext<INotificationContext | null>(
  null
);
NotificationContext.displayName = "NotificationContext";

function isNotificationsSupported() {
  return AssertClientSide() && "Notification" in window;
}

// NOTE older browsers use a callback instead of returning a promise
// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#example
function asyncRequestPermission(
  setPermission: (permission: NotificationPermission) => void
) {
  try {
    Notification.requestPermission().then(permission =>
      setPermission(permission)
    );
  } catch (e) {
    Notification.requestPermission(function (permission) {
      setPermission(permission);
    });
  }
}

export const NotificationContextProvider: React.FC = ({ children }) => {
  const [user, isLoading] = useUser();
  const [permissionStatus, setPermissionStatus] = useState<
    NotificationPermission | "unsupported"
  >(isNotificationsSupported() ? Notification.permission : "unsupported");
  const notificationQueue = useRef<INotification[]>([]);
  const router = useRouter();

  const queueNotification = (notification: INotification) => {
    notificationQueue.current.push(notification);
  };

  const sendNotification = async (notification: INotification) => {
    if (permissionStatus !== "unsupported") {
      const { text, route, title = "HEDI", maxLength } = notification;
      if (permissionStatus === "default") {
        console.warn(
          "Notification cannot be sent – permission was not granted yet. Notification will be queued."
        );
        queueNotification(notification);
      }

      let displayMessage = text.substring(
        0,
        maxLength ?? DEFAULT_NOTIFICATION_MAX_LENGTH
      );

      if (displayMessage.length < text.length) {
        displayMessage += "...";
      }

      const browserNotification = new Notification(title, {
        body: displayMessage,
        tag: displayMessage + Date.now(),
      });

      if (route) {
        browserNotification.addEventListener("click", () => {
          router.push(route);
        });
      }
    }
  };

  const flushNotificationQueue = async () => {
    while (notificationQueue.current.length > 0) {
      const n = notificationQueue.current.pop() as INotification; // casted, because the array cannot be empty here
      await sendNotification(n);
    }
  };

  const requestPermission = async () => {
    if (permissionStatus !== "unsupported" && user && !isLoading) {
      if (permissionStatus === "default") {
        asyncRequestPermission(setPermissionStatus);
      }
      if (permissionStatus === "granted") {
        await flushNotificationQueue();
      }
      return permissionStatus === "granted";
    }
    return false;
  };

  return (
    <NotificationContext.Provider
      value={{
        sendNotification,
        requestPermission,
        queueNotification,
        flushNotificationQueue,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw "NotificationContext not initialized. Is your app missing the NotificationProvider?";
  }
  return ctx;
};
