import { ClickableTile, Row } from "carbon-components-react";
import { useRouter } from "next/router";
import { isRoomOwnEvent } from "../../utils/isOwnEvent";
import { formatDateRelative } from "../../utils/dateFormat/formatDateRelative";
import { createRoomURL } from "../../utils/roomURL";
import { isMatrixCallEvent } from "../CallEvent";
import { getCallEventDescription } from "../CallEvent/getCallEventDescription";
import { isMatrixMessageEvent } from "../MessageEvent";
import { getMessageEventDescription } from "../MessageEvent/getMessageEventDescription";
import { isMatrixRoomEvent } from "../RoomEvent";
import { getRoomEventDescription } from "../RoomEvent/getRoomEventDescription";
import { IRoomInfo } from "./types";
import { useRoomInfo } from "./useRoomInfo";

export const RoomInfo = (props: IRoomInfo) => {
  const { room, locale, ...definition } = props;
  const {
    conversationRoute,
    messageEventDescDefinition,
    roomEventDefinition,
    callEventDefinition,
    formatDateRelativeDefinition,
    noMembersYetLabel,
  } = definition;

  const router = useRouter();
  const { otherMember, lastMessage, unreadMessages } = useRoomInfo({
    room,
  });

  const onRoomClick = async () => {
    // await requestNotificationPermission();

    await room.client.setRoomReadMarkers(
      room.roomId,
      room.timeline[room.timeline.length - 1].getId(),
      room.timeline[room.timeline.length - 1]
    );
    /*  await room.client.sendReadReceipt(room.timeline[room.timeline.length - 1], {
      hidden: false,
    }); */
    await room.client.sendReadReceipt(room.timeline[room.timeline.length - 1]);
    await router.push(createRoomURL(conversationRoute, room.roomId));
  };

  const imageUrl =
    otherMember?.getAvatarUrl(
      room.client.baseUrl,
      200,
      200,
      "scale",
      false,
      false
    ) ?? "/svg/pregnancy_blue.svg";

  const isOwnEvent = isRoomOwnEvent(room, lastMessage);

  let description = null;
  if (isMatrixMessageEvent(lastMessage)) {
    description = getMessageEventDescription(
      lastMessage,
      messageEventDescDefinition
    );
  } else if (isMatrixRoomEvent(lastMessage)) {
    description = getRoomEventDescription(lastMessage, roomEventDefinition, {
      color: "#2a84c6",
    });
  } else if (isMatrixCallEvent(lastMessage)) {
    description = getCallEventDescription(
      lastMessage,
      isOwnEvent,
      callEventDefinition
    );
  }

  const eventDate = formatDateRelative({
    date: lastMessage?.getDate(),
    locale,
    ...formatDateRelativeDefinition,
  });

  return (
    <ClickableTile
      className="hedi--msg-room-info"
      onClick={() => onRoomClick()}>
      <Row className="hedi--msg-room-info-row">
        <div className="hedi--msg-room-info-profile-image">
          <img src={imageUrl ?? ""} alt="" />
        </div>
        <div className={"hedi--msg-room-info-wrapper"}>
          <div className={"hedi--msg-room-info-user"}>
            <h4 className="hedi--msg-room-info-user-name">
              {/*TODO add actual strings*/}
              {otherMember?.rawDisplayName ?? `(${noMembersYetLabel})`}
            </h4>
            <p className="hedi--msg-room-info-user-date">{eventDate}</p>
          </div>
          <div className={`hedi--msg-room-info-last-message-wrapper`}>
            <div className={`hedi--msg-room-info-last-message`}>
              {description?.icon}
              <div
                className={`hedi--msg-room-info-last-message-text ${
                  unreadMessages ? "bold" : ""
                }`}>
                <p
                  dangerouslySetInnerHTML={{ __html: description?.text ?? "" }}
                />
              </div>
            </div>
            {unreadMessages && <div className="unreadMessages" />}
          </div>
        </div>
      </Row>
      <div className="hedi--msg-room-info-separator" />
    </ClickableTile>
  );
};
