import { useEffect, useState } from "react";
import { MatrixEvent, Room, TimelineWindow } from "matrix-js-sdk";

export const useInitTimelineWindow = (props: {
  room: Room;
  setEvents: (events: MatrixEvent[]) => void;
  initialLoadSize: number;
}) => {
  const { room, setEvents, initialLoadSize } = props;
  const [timelineWindow, setTimelineWindow] = useState<TimelineWindow | null>(
    null
  );

  // setup TimelineWindow State
  useEffect(() => {
    // initialize TimelineWindow instance
    const tlw = new TimelineWindow(
      room.client,
      room.getUnfilteredTimelineSet(),
      {
        windowLimit: Number.MAX_VALUE,
      }
    );
    tlw.load("", initialLoadSize).then(_ => {
      setTimelineWindow(tlw);
      setEvents(tlw.getEvents());
    });
  }, [room]);

  return timelineWindow;
};
