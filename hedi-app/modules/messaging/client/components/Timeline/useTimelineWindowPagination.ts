import { useEffect, useState } from "react";
import {
  EventTimeline,
  MatrixEvent,
  Room,
  RoomEvent,
  TimelineWindow,
} from "matrix-js-sdk";

export const useTimelineWindowPagination = (props: {
  room: Room;
  timelineWindow: TimelineWindow | null;
  setEvents: (events: MatrixEvent[]) => void;
  setScrollDataBeforeLoad: (
    data: { firstVisibleId: number; topOffset: number } | null
  ) => void;
}) => {
  const { room, timelineWindow, setEvents, setScrollDataBeforeLoad } = props;
  const [newMessageLoaded, setNewMessageLoaded] = useState(false);

  // Listen on Room for new messages and paginate them
  useEffect(() => {
    const onNewEventsListener = (
      event: MatrixEvent,
      _room: Room,
      toStartOfTimeline: boolean,
      removed: boolean,
      data: any
    ) => {
      if (!toStartOfTimeline && data.liveEvent) {
        setNewMessageLoaded(true);

        timelineWindow
          ?.paginate(EventTimeline.FORWARDS, 1, true, 40)
          .then(re => {
            if (re) {
              const timeLineEvents = [...timelineWindow.getEvents()];
              if (
                timeLineEvents[timeLineEvents.length - 1].sender.userId ===
                room.myUserId
              ) {
                setEvents(timeLineEvents);
                setScrollDataBeforeLoad(null);
              }
            }
          });
      }
    };

    room.on(RoomEvent.Timeline, onNewEventsListener);
    return () => {
      room.removeListener(RoomEvent.Timeline, onNewEventsListener);
    };
  }, [room, timelineWindow, setNewMessageLoaded]);

  return newMessageLoaded;
};
