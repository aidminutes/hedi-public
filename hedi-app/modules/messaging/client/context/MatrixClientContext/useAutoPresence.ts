import { useEffect } from "react";
import { MatrixClient } from "matrix-js-sdk";
import { AssertClientSide } from "@/modules/common/utils";

export const useAutoPresence = (client: MatrixClient | null) => {
  useEffect(() => {
    if (AssertClientSide() && client) {
      const visibilityChangeListener = () => {
        if (client.isLoggedIn()) {
          client.setPresence({
            presence: document.hidden ? "offline" : "online",
          });
        }
      };

      document.addEventListener("visibilitychange", visibilityChangeListener);

      return function destruct() {
        document.removeEventListener(
          "visibilitychange",
          visibilityChangeListener
        );
      };
    }
  }, [client]);
};
