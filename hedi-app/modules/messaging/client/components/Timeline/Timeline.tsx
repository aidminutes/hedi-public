import { ArrowDown32 } from "@carbon/icons-react";
import { Loading, Row } from "carbon-components-react";
import { useMemo, useRef } from "react";
import { formatDateRelative } from "../../utils/dateFormat/formatDateRelative";
import { isRoomOwnEvent } from "../../utils/isOwnEvent";
import { EventTile } from "../EventTile";
import { ITimeline } from "./types";
import { useTimeLineEvents } from "./useTimeLineEvents";
import { useOtherMember } from "./useOtherMember";

const initialLoadSize = 60;
const reloadSize = 40;

// handles the all messages and events of a room through the TimelineWindow class
// all events are grouped into timeline sets. the window class helps with pagination, loading, etc
export const Timeline = (props: ITimeline) => {
  const { room, locale, hideUnknownEvents, ...definition } = props;
  const {
    newMessagesText,
    eventTileDefinition,
    formatDateRelativeDefinition,
  } = definition;

  const timeLineRef = useRef<HTMLDivElement>(null);

  const {
    showBackDownButton,
    loader,
    events,
    lastRead,
    onImageLoaded,
  } = useTimeLineEvents({
    room,
    timeLineRef,
    initialLoadSize,
    reloadSize,
  });

  const otherMember = useOtherMember({ room });

  const eventsToRender = useMemo(() => {
    return events.map((event, index) => {
      const lastMessage = events[Math.max(index - 1, 0)];
      const nextMessage = events[Math.min(index + 1, events.length)];

      let sideSwap = false;
      if (event?.sender?.userId !== nextMessage?.sender?.userId) {
        sideSwap = true;
      }

      let isFirstInGroup = true;
      if (event?.sender?.userId === lastMessage?.sender?.userId) {
        isFirstInGroup = false;
      }

      const receipts = room.getReceiptsForEvent(event).filter(e => {
        return e.userId === otherMember?.userId ?? "";
      });

      const isOwnEvent = isRoomOwnEvent(room, event);

      const returnValue = [
        <EventTile
          event={event}
          isOwnEvent={isOwnEvent}
          locale={locale}
          onImageLoaded={onImageLoaded}
          read={receipts && receipts[0] && receipts[0]?.type === "m.read"}
          sideSwap={sideSwap}
          isFirstInGroup={isFirstInGroup}
          hideUnknownEvents={hideUnknownEvents}
          {...eventTileDefinition}
          key={event.getId()}
        />,
      ];

      // Day separation marker
      if (
        nextMessage &&
        event.getDate()?.getDay() !== nextMessage.getDate()?.getDay()
      ) {
        returnValue.push(
          <Row className="hedi--msg-message--dayBreak">
            {formatDateRelative({
              date: nextMessage.getDate(),
              locale,
              hideTime: true,
              ...formatDateRelativeDefinition,
            })}
          </Row>
        );
      }

      return returnValue;
    });
  }, [events, room]);

  return (
    <div className="hedi--msg-timeline" ref={timeLineRef}>
      {loader && <Loading />}
      {eventsToRender}
      <div
        className={`backDown ${showBackDownButton ? " visible" : ""}`}
        onClick={() =>
          timeLineRef.current?.scrollTo({
            top: timeLineRef?.current?.scrollHeight ?? 100000000,
          })
        }>
        <ArrowDown32 />
        <div
          className={`newMessage ${
            events[events.length - 1]?.getId() !== lastRead?.getId()
              ? "visible"
              : ""
          }`}>
          {newMessagesText}
        </div>
      </div>
    </div>
  );
};
