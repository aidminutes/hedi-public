import { useEffect, useState } from "react";
import {
  MatrixEvent,
  Room,
  RoomEvent,
  RoomMember,
  RoomState,
  RoomStateEvent,
} from "matrix-js-sdk";

export const useRoomInfo = (props: { room: Room }) => {
  const { room } = props;
  const [otherMember, setOtherMember] = useState<RoomMember | undefined>(
    undefined
  );
  const [lastMessage, setLastMessage] = useState<MatrixEvent | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(false);

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
  }, [room, setOtherMember]);

  //set last message initial
  useEffect(() => {
    setLastMessage(room.timeline[room.timeline.length - 1]);
  }, [room.timeline]);

  //listen on last for new messages in chat
  useEffect(() => {
    const e = (
      event: MatrixEvent,
      r: Room,
      toStartOfTimeline: any,
      removed: boolean,
      data: any
    ) => {
      if (!toStartOfTimeline && data.liveEvent && r.roomId === room.roomId) {
        const messageToAppend = r.timeline?.[r.timeline.length - 1];
        setLastMessage(messageToAppend);
      }
    };
    room.on(RoomEvent.Timeline, e);
    return () => {
      room.removeListener(RoomEvent.Timeline, e);
    };
  }, [room]);

  //check last message receipts for unread
  useEffect(() => {
    if (lastMessage) {
      const receipts = room.getReceiptsForEvent(lastMessage).filter(e => {
        return e.userId === room.myUserId ?? "";
      });
      setUnreadMessages(receipts.length === 0);
    }
  }, [lastMessage]);

  return { otherMember, lastMessage, unreadMessages };
};
