import { getCallEventDescription } from "./getCallEventDescription";
import { ICallEvent } from "./types";

export const CallEvent = (props: ICallEvent) => {
  const {
    event,
    isOwnEvent,
    formattedEventDate,
    ...callEventDefinition
  } = props;

  if (event.event.type === "m.call.candidates") {
    // NOTE ignore. similar event already handled
    return null;
  }

  const description = getCallEventDescription(
    event,
    isOwnEvent,
    callEventDefinition
  );

  const eventDate = formattedEventDate ?? event?.getDate()?.toLocaleString();

  if (description) {
    const { icon, text } = description;
    return (
      <div className={`hedi--msg--call-chat-event`} id={event.getId()}>
        {icon}
        {text + " - " + eventDate}
      </div>
    );
  } else {
    return null;
  }
};
