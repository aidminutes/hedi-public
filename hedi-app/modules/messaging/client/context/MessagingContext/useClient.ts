import { useCallback, useEffect, useMemo, useState } from "react";
import { AssertClientSide } from "@/modules/common/utils/functions";
import { IMessagingContext } from "./types";
import { createMatrixClient } from "../createMatrixClient";
import { DefaultMessagingContext } from "./DefaultMessagingContext";

type ClientLoader = Pick<IMessagingContext, "client" | "tryLoadClient">;

export const useClient = (user?: object | null): ClientLoader => {
  const [client, setClient] = useState(DefaultMessagingContext.client);
  const [tryLoadClient, setTryLoadClient] = useState(
    () => DefaultMessagingContext.tryLoadClient
  );

  // check if allowed to load here or serverside?
  // maybe import async?
  const loadCallback = useCallback(() => {
    if (AssertClientSide()) {
      setClient(c => (!!c ? c : createMatrixClient()));
    }
  }, []);

  // only enable client loading if user is logged in
  // should enable dynamic lib loading
  useEffect(() => {
    if (user && tryLoadClient !== loadCallback) {
      setTryLoadClient(_ => loadCallback);
    }
  }, [user]);

  return useMemo(() => ({ client, tryLoadClient }), [client, tryLoadClient]);
};
