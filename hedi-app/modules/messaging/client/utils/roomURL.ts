import { ParsedUrlQuery } from "querystring";

export function createRoomURL(conversationRoute: string, roomId: string) {
  const sanitizedId = roomId.replace(":hedi.msg", ".hedi.msg");
  return conversationRoute + "?r=" + sanitizedId;
}

export function tryGetRoomId(segmentsQuery: ParsedUrlQuery) {
  const { r } = segmentsQuery;
  const roomId: string = r as string;
  if (
    !!roomId &&
    (roomId.endsWith(".hedi.msg") || roomId.endsWith(":hedi.msg"))
  ) {
    return roomId.replace(".hedi.msg", ":hedi.msg");
  }
  return null;
}
export function tryGetConnectionRoute(segmentsQuery: ParsedUrlQuery) {
  const { c } = segmentsQuery;
  const connRoute: string = c as string;
  if (!!connRoute) {
    return connRoute;
  }
}
