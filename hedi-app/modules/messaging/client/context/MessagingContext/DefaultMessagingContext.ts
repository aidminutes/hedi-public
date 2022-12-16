import { DefaultCallSession } from "./session/DefaultCallSession";
import { IMessagingContext } from "./types";

export const DefaultMessagingContext: IMessagingContext = {
  client: null,
  tryLoadClient: () => {},
  callSession: DefaultCallSession,
};
