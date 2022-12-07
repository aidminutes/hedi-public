import { useEffect } from "react";
import {
  HttpApiEvent,
  MatrixClient,
  MatrixError,
  RoomMember,
} from "matrix-js-sdk";

export const useAutoJoinRoom = (client?: MatrixClient | null) => {
  useEffect(() => {
    if (client) {
      //const roomInviteListener = (_: any, member: RoomMember) => {
      const roomInviteListener = (err: MatrixError) => {
        // automatically join room on invite
        /*  if (
          client.credentials.userId &&
          member.membership === "invite" &&
          member.userId === client.credentials.userId
        ) {
          client.joinRoom(member.roomId);
        } */
      };
      client.addListener(HttpApiEvent.SessionLoggedOut, roomInviteListener);
      return () => {
        client.removeListener(
          HttpApiEvent.SessionLoggedOut,
          roomInviteListener
        );
      };
    }
  }, [client]);
};
