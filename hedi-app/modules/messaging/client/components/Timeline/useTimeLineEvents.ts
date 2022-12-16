import { MatrixEvent, Room } from "matrix-js-sdk";
import { RefObject, useState } from "react";
import { useInitTimelineWindow } from "./useInitTimelineWindow";
import { useLastReadMessage } from "./useLastReadMessage";
import { useTimelineWindowRoomListener } from "./useTimelineWindowRoomListener";
import { useTimelineScrollListener } from "./useTimelineScrollListener";
import { useTimelineWindowPagination } from "./useTimelineWindowPagination";

export const useTimeLineEvents = (props: {
  room: Room;
  timeLineRef: RefObject<HTMLDivElement>;
  initialLoadSize: number;
  reloadSize: number;
}) => {
  const { room, timeLineRef, initialLoadSize, reloadSize } = props;
  const [events, setEvents] = useState<MatrixEvent[]>([]);
  const [scrollDataBeforeLoad, setScrollDataBeforeLoad] = useState<null | {
    firstVisibleId: number;
    topOffset: number;
  }>(null);

  // Create Timeline Window and load initial events
  const timelineWindow = useInitTimelineWindow({
    room,
    setEvents,
    initialLoadSize,
  });

  useTimelineWindowRoomListener({
    room,
    timelineWindow,
    setEvents,
  });

  const newMessageLoaded = useTimelineWindowPagination({
    room,
    timelineWindow,
    setEvents,
    setScrollDataBeforeLoad,
  });

  const lastRead = useLastReadMessage({ room, events });

  const {
    showBackDownButton,
    loader,
    onImageLoaded,
  } = useTimelineScrollListener({
    room,
    events,
    timeLineRef,
    timelineWindow,
    lastRead,
    scrollDataBeforeLoad,
    setEvents,
    setScrollDataBeforeLoad,
    reloadSize,
    newMessageLoaded,
  });

  return { showBackDownButton, loader, events, lastRead, onImageLoaded };
};
