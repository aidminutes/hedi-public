import { createContext, useContext } from "react";
import { DefaultMessagingContext } from "./DefaultMessagingContext";
import { IMessagingContext } from "./types";

export const MessagingContext = createContext<IMessagingContext>(
  DefaultMessagingContext
);
MessagingContext.displayName = "MessagingContext";

export const useMessagingContext = () => {
  return useContext(MessagingContext);
};

export const useMessagingCallSession = () => {
  return useContext(MessagingContext).callSession;
};
