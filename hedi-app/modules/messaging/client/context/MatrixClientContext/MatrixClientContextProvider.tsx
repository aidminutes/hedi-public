import { AssertClientSide } from "@/modules/common/utils";
import { ReactNode } from "react";
import { useMessagingContext } from "../MessagingContext";
import { MatrixClientContext } from "./MatrixClientContext";
import { useAutoPresence } from "./useAutoPresence";

export const MatrixClientContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const { client, tryLoadClient } = useMessagingContext();
  tryLoadClient();
  useAutoPresence(client);
  if (AssertClientSide() && client) {
    return (
      <MatrixClientContext.Provider value={client}>
        {children}
      </MatrixClientContext.Provider>
    );
  } else {
    return null;
  }
};
