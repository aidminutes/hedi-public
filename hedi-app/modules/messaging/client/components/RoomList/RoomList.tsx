import { ClientEvent, Room } from "matrix-js-sdk";
import { useEffect, useState } from "react";
import { useMatrixClient } from "../../context/MatrixClientContext";
import { RoomInfo } from "../RoomInfo";
import { IRoomList } from "./types";

export const RoomList = (props: IRoomList) => {
  const { locale, setIsLoggedIn, filter, ...roomInfoDefinition } = props;
  const roomFilter = filter ?? (() => true);
  const client = useMatrixClient();
  const [rooms, setRooms] = useState<Room[]>(
    client.getRooms().filter(roomFilter)
  );

  useEffect(() => {
    setRooms(client.getRooms().filter(roomFilter));
  }, [client]);

  useEffect(() => {
    const getRoom = (r: Room) => {
      setRooms(client.getRooms().filter(roomFilter));
      if (setIsLoggedIn) {
        setIsLoggedIn(client.isLoggedIn());
      }
    };
    client.on(ClientEvent.Room, getRoom);
    return () => {
      client.removeListener(ClientEvent.Room, getRoom);
    };
  }, [client, rooms]);

  return (
    <>
      {rooms?.map(room => {
        return (
          <RoomInfo
            room={room}
            locale={locale}
            {...roomInfoDefinition}
            key={room.roomId}
          />
        );
      })}
    </>
  );
};
