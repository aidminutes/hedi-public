import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MatrixClient } from "matrix-js-sdk";
import { MatrixCall } from "matrix-js-sdk/lib/webrtc/call";
import { INotificationContext } from "@/modules/pwr/client/components/NotificationContext";

import { createRoomURL, tryGetRoomId } from "../../../utils/roomURL";
import { ICallNotificationDefinition } from "./types";
import { CallEventHandlerEvent } from "matrix-js-sdk/lib/webrtc/callEventHandler";

export const useCallNotification = (
  client: MatrixClient | null,
  notificationContext: INotificationContext | null,
  matrixCall: MatrixCall | null,
  callNotificationDefinition: ICallNotificationDefinition
) => {
  const router = useRouter();

  const [routeRoomId, setRouteRoomId] = useState<string | null>(null);

  useEffect(() => {
    setRouteRoomId(tryGetRoomId(router.query));
  }, [router]);

  useEffect(() => {
    if (client && notificationContext) {
      const {
        conversationRoute,
        incomingCallText,
        missedIncomingCallText,
      } = callNotificationDefinition;
      const incomingCallNotificationListener = (incomingCall: MatrixCall) => {
        // If incoming call is already handled
        // skip this event
        if (
          incomingCall.callId === matrixCall?.callId ||
          incomingCall.roomId === routeRoomId
        ) {
          return;
        }

        //there is a Active call already
        const notificationText =
          matrixCall !== null ? missedIncomingCallText : incomingCallText;
        notificationContext?.sendNotification({
          text: notificationText,
          title: incomingCall.getOpponentMember().rawDisplayName,
          route: createRoomURL(conversationRoute, incomingCall.roomId),
        });
      };

      client?.on(
        CallEventHandlerEvent.Incoming,
        incomingCallNotificationListener
      );
      return () => {
        client?.removeListener(
          CallEventHandlerEvent.Incoming,
          incomingCallNotificationListener
        );
      };
    }
  }, [
    client,
    notificationContext,
    matrixCall,
    routeRoomId,
    callNotificationDefinition,
  ]);
};
