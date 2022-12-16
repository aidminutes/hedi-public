import { useEffect, useState } from "react";
import {
  MatrixEvent,
  Room,
  RoomMember,
  RoomState,
  RoomStateEvent,
} from "matrix-js-sdk";

export const useOtherMember = (props: { room: Room }) => {
  const { room } = props;
  const [otherMember, setOtherMember] = useState<RoomMember | undefined>(
    undefined
  );

  useEffect(() => {
    setOtherMember(
      room?.getJoinedMembers().find(m => m.userId !== room.myUserId)
    );
    const roomMemberListener = (
      event: MatrixEvent,
      state: RoomState,
      member: RoomMember
    ) => {
      setOtherMember(
        room?.getJoinedMembers().find(m => m.userId !== room.myUserId)
      );
    };
    room.client.on(RoomStateEvent.NewMember, roomMemberListener);
    return () => {
      room.client.removeListener(RoomStateEvent.NewMember, roomMemberListener);
    };
  }, [room]);

  return otherMember;
};
