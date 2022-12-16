import { MatrixEvent, Room, RoomEvent } from "matrix-js-sdk";
import { useEffect, useState } from "react";

export const useLastReadMessage = (props: {
  room: Room;
  events: MatrixEvent[];
}) => {
  const { room, events } = props;
  const [lastRead, setLastRead] = useState<MatrixEvent | null>(null);

  useEffect(() => {
    const event = events.filter(
      e =>
        e.getId() ===
        room.getAccountData("m.fully_read")?.event.content?.event_id
    )[0];
    setLastRead(event ?? null);
    const accountDataLastReadListener = () => {
      const event = events.filter(
        e =>
          e.getId() ===
          room.getAccountData("m.fully_read")?.event.content?.event_id
      )[0];
      setLastRead(event ?? null);
    };
    room.on(RoomEvent.AccountData, accountDataLastReadListener);
    return () => {
      room.removeListener(RoomEvent.AccountData, accountDataLastReadListener);
    };
  }, [room, events]);
  return lastRead;
};
