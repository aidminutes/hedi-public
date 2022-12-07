import { formatDateRelative } from "../../utils/dateFormat/formatDateRelative";
import { CallEvent, isMatrixCallEvent } from "../CallEvent";
import { MessageEvent, isMatrixMessageEvent } from "../MessageEvent";
import { RoomEvent, isMatrixRoomEvent } from "../RoomEvent";
import { IEventTile } from "./types";

export const EventTile = (props: IEventTile) => {
  const {
    event,
    isOwnEvent,
    messageEventDefinition,
    roomEventDefinition,
    callEventDefinition,
    formatDateRelativeDefinition,
    ...eventTileConfig
  } = props;

  const { locale, hideUnknownEvents, ...messageEventConfig } = eventTileConfig;

  const formattedEventDate = formatDateRelative({
    date: event?.getDate(),
    locale,
    alwaysShowTime: true,
    ...formatDateRelativeDefinition,
  });

  let eventComponent = null;
  if (isMatrixMessageEvent(event)) {
    eventComponent = MessageEvent({
      event,
      isOwnEvent,
      formattedEventDate,
      ...messageEventDefinition,
      ...messageEventConfig,
    });
  } else if (isMatrixRoomEvent(event)) {
    eventComponent = RoomEvent({
      event,
      formattedEventDate,
      ...roomEventDefinition,
    });
  } else if (isMatrixCallEvent(event)) {
    eventComponent = CallEvent({
      event,
      isOwnEvent,
      formattedEventDate,
      ...callEventDefinition,
    });
  }

  // render debug component
  if (eventComponent === null && !hideUnknownEvents) {
    eventComponent = (
      <div className={`hedi--msg-chat-event`} id={event.getId()}>
        {JSON.stringify(event.event.type)}
      </div>
    );
  }

  return eventComponent;
};
