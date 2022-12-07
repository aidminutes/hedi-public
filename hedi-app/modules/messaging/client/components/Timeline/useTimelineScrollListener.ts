import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  EventTimeline,
  MatrixEvent,
  Room,
  TimelineWindow,
} from "matrix-js-sdk";
import { getFirstVisibleElementData } from "./timelineHelper";

export const useTimelineScrollListener = (props: {
  room: Room;
  events: MatrixEvent[];
  timeLineRef: RefObject<HTMLDivElement>;
  timelineWindow: TimelineWindow | null;
  lastRead: MatrixEvent | null;
  scrollDataBeforeLoad: null | { firstVisibleId: number; topOffset: number };
  setEvents: (events: MatrixEvent[]) => void;
  setScrollDataBeforeLoad: (
    data: { firstVisibleId: number; topOffset: number } | null
  ) => void;
  reloadSize: number;
  newMessageLoaded: boolean;
}) => {
  const {
    room,
    events,
    timeLineRef,
    timelineWindow,
    setEvents,
    setScrollDataBeforeLoad,
    lastRead,
    scrollDataBeforeLoad,
    reloadSize,
    newMessageLoaded,
  } = props;
  const [showBackDownButton, setShowBackDownButton] = useState(false);
  const [isPaginated, setIsPaginated] = useState(false);
  const [loader, setLoader] = useState(false);
  const oldEvents = useRef<MatrixEvent[]>([]);

  // Scroll listener: pagination , backDownButton, readStatus
  useEffect(() => {
    if (!timeLineRef || !timeLineRef?.current) {
      return;
    }
    const onScrollListener = (e: Event) => {
      const scrollBottom =
        (timeLineRef.current?.scrollHeight ?? 0) -
        ((timeLineRef?.current?.scrollTop ?? 0) +
          (timeLineRef?.current?.clientHeight ?? 0));

      if (scrollBottom > 300) {
        setShowBackDownButton(true);
      } else {
        // Mark last event as read in not already red and chat is scrolled to the bottom
        if (events[events.length - 1]?.getId() !== lastRead?.getId()) {
          const event = events[events.length - 1];
          if (!event.isSending()) {
            room.client.setRoomReadMarkers(room.roomId, event.getId(), event);
            room.client.sendReadReceipt(events[events.length - 1]);
          }
        }
        setShowBackDownButton(false);
      }

      // Pagination backwards if scroll threshold top is reached and pagination not already in progress
      if (
        events.length >= 60 &&
        scrollDataBeforeLoad === null &&
        timeLineRef.current?.scrollTop &&
        timeLineRef.current?.scrollTop <= 300
      ) {
        const firstVisibleElementData = getFirstVisibleElementData(e);
        setLoader(true);
        timelineWindow
          ?.paginate(EventTimeline.BACKWARDS, reloadSize, true, reloadSize)
          .then(r => {
            if (r) {
              setIsPaginated(true);
              const timeLineEvents = [...timelineWindow.getEvents()];
              setScrollDataBeforeLoad(firstVisibleElementData);
              setEvents(timeLineEvents);
              setLoader(false);
            } else {
              setLoader(false);
            }
          });
      }
    };

    timeLineRef.current.addEventListener("scroll", onScrollListener);
    return () =>
      timeLineRef.current?.removeEventListener("scroll", onScrollListener);
  }, [timeLineRef, timelineWindow, events, scrollDataBeforeLoad, lastRead]);

  // Scroll handling
  useEffect(() => {
    if (!timeLineRef || !timeLineRef.current) {
      return;
    }

    const isLastOwn =
      events[events.length - 1]?.event?.sender === room.myUserId;
    // Initial and new own message scroll down
    if (
      (isLastOwn || !showBackDownButton) &&
      events.length !== oldEvents.current.length
    ) {
      timeLineRef.current.scrollTop =
        timeLineRef.current.scrollHeight + timeLineRef.current.clientHeight;
    }

    // Scroll to last message before pagination
    if (scrollDataBeforeLoad) {
      const message = document.getElementById(
        "" + scrollDataBeforeLoad.firstVisibleId
      );
      if (!!message) {
        message.scrollIntoView();
        setScrollDataBeforeLoad(null);
      }
    }
    oldEvents.current = events;
  }, [
    newMessageLoaded,
    timeLineRef,
    timeLineRef.current,
    events,
    oldEvents,
    scrollDataBeforeLoad,
    showBackDownButton,
  ]);

  const onImageLoaded = useCallback(() => {
    if (!isPaginated && !newMessageLoaded && !!timeLineRef.current) {
      // Initial and new own message scroll down
      timeLineRef.current.scrollTop =
        timeLineRef.current.scrollHeight + timeLineRef.current.clientHeight;
    }
  }, [timeLineRef, isPaginated, newMessageLoaded]);

  return { showBackDownButton, loader, onImageLoaded };
};
