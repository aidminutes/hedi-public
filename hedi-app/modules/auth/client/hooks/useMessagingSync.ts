import { useAutoPresence } from "@/modules/messaging/client/context/MatrixClientContext/useAutoPresence";
import { useMessagingContext } from "@/modules/messaging/client/context/MessagingContext";

export const useMessagingSync = () => {
  const { client, tryLoadClient } = useMessagingContext();
  tryLoadClient();
  useAutoPresence(client);
  return { client };
};
