import { getRoomEventDescription } from "./getRoomEventDescription";
import { IRoomEvent } from "./types";

export const RoomEvent = (props: IRoomEvent) => {
  const { event, formattedEventDate, ...roomEventDescDefinition } = props;

  const description = getRoomEventDescription(event, roomEventDescDefinition);

  const eventDate = formattedEventDate ?? event?.getDate()?.toLocaleString();

  // NOTE for now only m.room.created display needed
  if (!!description && event.event.type === "m.room.create") {
    const { icon, text } = description;
    return (
      <div className={`hedi--msg-chat-event`} id={event.getId()}>
        {icon}
        {text + " - " + eventDate}
      </div>
    );
  } else {
    return null;
  }
};
