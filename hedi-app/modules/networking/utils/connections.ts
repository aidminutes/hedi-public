import { NextRouter, Router } from "next/router";
import { getMidwifeCareConnectionChatRoomId } from "../client/request/getMidwifeCareConnectionChatRoomId";
import { IMidwifeCareConnection } from "../types";

export const hasActiveCareRequest = (
  profileRoute: string,
  careConnections?: IMidwifeCareConnection[]
) => {
  if (!careConnections) return false;
  return !!careConnections.find(
    conn =>
      conn.recipient.route == profileRoute &&
      !![
        "unread",
        ".read",
        "tentative",
        "handshaking",
        "accepted",
        "active",
      ].find(stat => conn.state.route.endsWith(stat))
  );
};

export const isUnderCare = (
  profileRoute: string,
  careConnections?: IMidwifeCareConnection[]
) => {
  if (!careConnections) return false;
  return !!careConnections.find(
    conn =>
      conn.recipient.route == profileRoute &&
      !!["active"].find(stat => conn.state.route.endsWith(stat))
  );
};

export function isCanceledOrWithdrawn(stateRoute: string): boolean {
  return stateRoute.endsWith("withdrawn") || stateRoute.endsWith("cancel");
}

export function isChattingAllowed(
  stateRoute: string,
  isPersonalProfile: boolean
): boolean {
  if (isPersonalProfile) {
    return (
      stateRoute.endsWith("tentative") ||
      stateRoute.endsWith("handshaking") ||
      stateRoute.endsWith("active")
    );
  } else {
    return (
      stateRoute.endsWith(".read") ||
      stateRoute.endsWith("unread") ||
      stateRoute.endsWith("tentative") ||
      stateRoute.endsWith("handshaking") ||
      stateRoute.endsWith("active")
    );
  }
  return false;
}

export const openChatRoomUsingRouter = async (
  router: NextRouter,
  conn: IMidwifeCareConnection,
  conversationLinkStr: string,
  isPersonalProfile: boolean
) => {
  let roomPromise = new Promise<string>(async (resolve, reject) => {
    if (isChattingAllowed(conn.state.route, isPersonalProfile)) {
      const res = await getMidwifeCareConnectionChatRoomId(conn.route);
      return resolve(res?.roomId ?? "");
    }
    return reject("");
  });
  roomPromise.then(roomId => {
    if (roomId) {
      router.push(conversationLinkStr + `?r=${roomId}&c=${conn.route}`);
    }
  });
};
