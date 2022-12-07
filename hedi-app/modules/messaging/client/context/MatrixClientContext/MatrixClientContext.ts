import { createContext, useContext } from "react";
import { MatrixClient } from "matrix-js-sdk";

export const MatrixClientContext = createContext<MatrixClient | null>(null);
MatrixClientContext.displayName = "MatrixClientContext";

export const useMatrixClient = () => {
  const client = useContext(MatrixClientContext);
  if (!client) throw new Error("[HEDI Messaging] could not load matrix client");
  return client;
};
