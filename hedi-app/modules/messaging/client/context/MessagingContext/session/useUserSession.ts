import { useEffect, useState } from "react";
import { ClientEvent, HttpApiEvent, MatrixClient } from "matrix-js-sdk";
import { login } from "../../../request/login";
import { generateDeviceId } from "../../../utils/generateDeviceId";

export type SessionState = never | "logged_out" | "logging_in" | "logged_in";

export const useUserSession = (
  client?: MatrixClient | null,
  user?: object | null
) => {
  const { sessionState, setSessionState } = useSessionListener(client);

  // authorize with cms and login
  useEffect(() => {
    if (
      client &&
      user &&
      sessionState !== "logging_in" &&
      sessionState !== "logged_in"
    ) {
      setSessionState("logging_in");

      login(client).then(resp => {
        if (resp?.user_id) {
          client.deviceId = generateDeviceId(resp.user_id);
          client.startClient({ initialSyncLimit: 60 }).then(_ => {
            setSessionState("logged_in");
          });
        } else {
          client.deviceId = undefined;
          setSessionState("logged_out");
        }
      });
    }
  }, [client, user, sessionState]);

  return sessionState;
};

const useSessionListener = (client: MatrixClient | null | undefined) => {
  const [sessionState, setSessionState] = useState<SessionState>("logged_out");

  useEffect(() => {
    if (client) {
      const logOutListener = (err: any) => {
        client.stopClient();
        setSessionState("logged_out");
      };
      client.addListener(HttpApiEvent.SessionLoggedOut, logOutListener);

      const syncStopListener = (state: string) => {
        if (
          state === "STOPPED" &&
          (sessionState === "logging_in" || sessionState === "logged_in")
        ) {
          setSessionState("logged_out");
        }
      };
      client.addListener(ClientEvent.Sync, syncStopListener);

      return () => {
        client.removeListener(HttpApiEvent.SessionLoggedOut, logOutListener);
        client.removeListener(ClientEvent.Sync, syncStopListener);
      };
    } else if (sessionState !== "logged_out") {
      setSessionState("logged_out");
    }
  }, [client]);

  return { sessionState, setSessionState };
};
