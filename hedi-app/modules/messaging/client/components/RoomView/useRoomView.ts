import { useEffect, useState } from "react";
import { ClientEvent, MatrixClient } from "matrix-js-sdk";

export const useRoomView = (props: {
  client: MatrixClient;
  roomId: string;
}) => {
  const { client, roomId } = props;

  const [room, setRoom] = useState(client.getRoom(roomId));

  useEffect(() => {
    // NOTE getRoom might return null, retry once after next sync
    if (!room) {
      client.once(ClientEvent.Sync, state => {
        if (state === "PREPARED") {
          const r = client.getRoom(roomId);
          setRoom(r);
        }
      });
    }
  }, [client, room]);

  return { room };
};
