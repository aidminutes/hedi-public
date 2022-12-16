import { MatrixClient } from "matrix-js-sdk";
import { useUserSession } from "./useUserSession";
import { IRingtonesState } from "../useRingtones";
import { useCallSession } from "./useCallSession";

export const useMessagingSession = (
  client: MatrixClient | null,
  user: object | null | undefined,
  playRing: Pick<IRingtonesState, "playIncomingRing" | "playOutgoingRing">
) => {
  // login & session state
  useUserSession(client, user);

  const { playIncomingRing, playOutgoingRing } = playRing;
  // setup user call state
  return useCallSession(client, playIncomingRing, playOutgoingRing);
};
