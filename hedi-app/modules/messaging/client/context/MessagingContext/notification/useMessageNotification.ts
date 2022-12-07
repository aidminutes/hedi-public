import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  IRoomTimelineData,
  MatrixClient,
  MatrixEvent,
  Room,
  RoomEvent,
} from "matrix-js-sdk";
import { INotificationContext } from "@/modules/pwr/client/components/NotificationContext";

import { createRoomURL, tryGetRoomId } from "../../../utils/roomURL";
import { isClientOwnEvent } from "../../../utils/isOwnEvent";
import { isMatrixMessageEvent } from "../../../components/MessageEvent";
import { getMessageEventDescription } from "../../../components/MessageEvent/getMessageEventDescription";
import { IMessageNotificationDefinition } from "./types";

export const useMessageNotification = (
  client: MatrixClient | null,
  notificationContext: INotificationContext | null,
  messageNotificationDefinition: IMessageNotificationDefinition
) => {
  const router = useRouter();

  const [routeRoomId, setRouteRoomId] = useState<string | null>(null);
  const [timestampThreshold] = useState<number>(Date.now());

  useEffect(() => {
    setRouteRoomId(tryGetRoomId(router.query));
  }, [router]);

  //listen on last for new messages in chat
  useEffect(() => {
    if (client && notificationContext) {
      const {
        conversationRoute,
        ...messageEventDescDefinition
      } = messageNotificationDefinition;
      const roomTimelineChatNotificationListener = (
        event: MatrixEvent,
        room: Room,
        toStartOfTimeline: boolean,
        removed: boolean,
        //data: { liveEvent: boolean }
        data: IRoomTimelineData
      ) => {
        if (
          !toStartOfTimeline &&
          data.liveEvent &&
          (event.getDate()?.getTime() ?? 0) > timestampThreshold &&
          (document.hidden || routeRoomId !== room.roomId)
        ) {
          const event = room.timeline?.[room.timeline.length - 1];
          if (isMatrixMessageEvent(event)) {
            const text = getMessageEventDescription(
              event,
              messageEventDescDefinition
            )?.text;
            if (!!text && !isClientOwnEvent(client, event)) {
              const userId = event.getSender();
              const displayName = client.getUser(userId)?.displayName;
              notificationContext.sendNotification({
                text,
                title: displayName,
                route: createRoomURL(conversationRoute, room.roomId),
              });
            }
          }
        }
      };

      client.addListener(
        RoomEvent.Timeline,
        roomTimelineChatNotificationListener
      );

      return () => {
        client.removeListener(
          RoomEvent.Timeline,
          roomTimelineChatNotificationListener
        );
      };
    }
  }, [
    client,
    notificationContext,
    routeRoomId,
    timestampThreshold,
    messageNotificationDefinition,
  ]);
};
