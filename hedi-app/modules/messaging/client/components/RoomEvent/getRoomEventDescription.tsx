import { Information16 } from "@carbon/icons-react";
import { CSSProperties } from "react";
import { IRoomEventDescDefinition, MatrixRoomEvent } from "./types";

export function getRoomEventDescription(
  event: MatrixRoomEvent,
  roomEventDescDefinition: IRoomEventDescDefinition,
  iconStyle?: CSSProperties
) {
  const { roomCreatedText } = roomEventDescDefinition;

  switch (event.event.type) {
    case "m.room.create":
    case "m.room.name":
    case "m.room.member":
      return {
        icon: (
          <Information16
            style={iconStyle ?? { color: "#fff", marginRight: "0.25rem" }}
          />
        ),
        text: roomCreatedText,
      };
    default:
      return null;
  }
}
