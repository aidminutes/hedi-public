import { useEffect } from "react";
import { MatrixEvent, Room, RoomEvent, TimelineWindow } from "matrix-js-sdk";

export const useTimelineWindowRoomListener = (props: {
  room: Room;
  timelineWindow: TimelineWindow | null;
  setEvents: (events: MatrixEvent[]) => void;
}) => {
  const { room, timelineWindow, setEvents } = props;

  useEffect(() => {
    if (!!timelineWindow) {
      const getEvents = () => {
        setEvents(timelineWindow.getEvents());
      };
      room.on(RoomEvent.LocalEchoUpdated, getEvents);
      room.on(RoomEvent.Receipt, getEvents);
      return () => {
        room.removeListener(RoomEvent.LocalEchoUpdated, getEvents);
        room.removeListener(RoomEvent.Receipt, getEvents);
      };
    }
  }, [room, timelineWindow]);
};
