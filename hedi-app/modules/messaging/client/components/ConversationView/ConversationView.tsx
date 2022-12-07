import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tryGetConnectionRoute, tryGetRoomId } from "../../utils/roomURL";
import { RoomView } from "../RoomView";
import { IConversationView } from "./types";

export const ConversationView = (props: { content: IConversationView }) => {
  const router = useRouter();
  const { lang, ...definition } = props.content;
  const [roomId, setRoomId] = useState<string | null>("");
  useEffect(() => {
    setRoomId(tryGetRoomId(router.query));
  }, [router.query]);
  return (
    <>
      {roomId && (
        <RoomView
          roomId={roomId}
          lang={lang}
          
          {...definition.roomViewDefinition}
        />
      )}
    </>
  );
};
