import { useState } from "react";
import { useMatrixClient } from "../../context/MatrixClientContext";
import { useMessagingCallSession } from "../../context/MessagingContext";
import { Call } from "../Call";
import { MessageComposer } from "../MessageComposer";
import { RoomHeader } from "../RoomHeader";
import { Timeline } from "../Timeline";
import { IRoomView } from "./types";
import { useRoomView } from "./useRoomView";

export const RoomView = (props: IRoomView) => {
  const { roomId, lang, ...definition } = props;
  const {
    timelineDefinition,
    messageComposerDefinition,
    callDefinition,
    roomHeaderDefinition,
  } = definition;
  const client = useMatrixClient();
  const { matrixCall } = useMessagingCallSession();
  const { room } = useRoomView({ client, roomId });

  const [showFileSharing, setShowFileSharing] = useState(false);
  const [otherMemberAvatar, setOtherMemberAvatar] = useState('');

  if (!room) {
    return null;
  }

  return (
    <div className={"hedi--msg-room"}>
      <RoomHeader
        room={room}
        client={client}
        setOtherMemberAvatar={setOtherMemberAvatar}
        {...roomHeaderDefinition}
      />
      <Timeline
        room={room}
        locale={lang}
        hideUnknownEvents={true}
        {...timelineDefinition}
      />
      <MessageComposer
        roomId={roomId}
        lang={lang}
        setShowFileSharing={(show: boolean) => setShowFileSharing(show)}
        showFileSharing={showFileSharing}
        {...messageComposerDefinition}
      />
      {!!matrixCall && <Call room={room} client={client} otherMemberAvatar={otherMemberAvatar} {...callDefinition} />}
    </div>
  );
};
