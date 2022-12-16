import { ReactNode, useMemo } from "react";
import { AssertServerSide } from "@/modules/common/utils";
import { useUser } from "@/modules/auth/client/hooks/useUser";
import { MessagingContext } from "./MessagingContext";
import { useClient } from "./useClient";
//import { useAutoJoinRoom } from "./useAutoJoinRoom";
import { useRingtones } from "./useRingtones";
import { useMessagingNotifications } from "./notification";
import { useMessagingSession } from "./session/useMessagingSession";

export const MessagingContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  if (AssertServerSide()) {
    return <>{children}</>;
  } else {
    const [user] = useUser();

    const clientLoader = useClient(user);
    const { client } = clientLoader;

    // automatic join on invite receive
    //useAutoJoinRoom(client);

    // setup ringtones & playing
    const { Ringtones, ...playRingtones } = useRingtones();

    // login, session & call state
    const callSession = useMessagingSession(client, user, playRingtones);

    // notifications
    useMessagingNotifications(client, callSession.matrixCall);

    const messagingContext = useMemo(() => ({ ...clientLoader, callSession }), [
      clientLoader,
      callSession,
    ]);

    return (
      <MessagingContext.Provider value={messagingContext}>
        {children}
        {!!client && Ringtones}
      </MessagingContext.Provider>
    );
  }
};
