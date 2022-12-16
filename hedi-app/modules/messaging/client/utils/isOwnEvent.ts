import { MatrixClient, MatrixEvent, Room } from "matrix-js-sdk";

export function isClientOwnEvent(
  client: MatrixClient | null,
  event: MatrixEvent | null
) {
  return !!event ? client?.credentials.userId === event.getSender() : false;
}

export function isRoomOwnEvent(room: Room | null, event: MatrixEvent | null) {
  return !!event ? room?.myUserId === event.getSender() : false;
}
