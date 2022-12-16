import { MatrixClient } from "matrix-js-sdk";
import { MatrixCall } from "matrix-js-sdk/lib/webrtc/call";
import { useNotificationContext } from "@/modules/pwr/client/components/NotificationContext";
import { useMessagingNotificationDefinition } from "./useMessagingNotificationDefinition";
import { useMessageNotification } from "./useMessageNotification";
import { useCallNotification } from "./useCallNotification";
import { useLocaleInfo } from "@/modules/shell/client/contexts";

export const useMessagingNotifications = (
  client: MatrixClient | null,
  currentCall: MatrixCall | null
) => {
  const {
    active: { locale },
  } = useLocaleInfo();

  const notificationContext = useNotificationContext();

  // fetch
  const { msgDef, callDef } = useMessagingNotificationDefinition(
    client,
    locale
  );

  // raise notifications on chat messages
  useMessageNotification(client, notificationContext, msgDef);

  // raise notifications on calls
  useCallNotification(client, notificationContext, currentCall, callDef);
};
