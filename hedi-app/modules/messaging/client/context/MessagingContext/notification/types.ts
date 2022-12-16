import { ICallEventDescDefinition } from "../../../components/CallEvent/types";
import { IMessageEventDescDefinition } from "../../../components/MessageEvent/types";
export interface IMessagingNotificationDefinition {
  msgDef: IMessageNotificationDefinition;
  callDef: ICallNotificationDefinition;
}

export interface IMessagingNotificationBaseDefinition {
  conversationRoute: string;
}
export interface IMessageNotificationDefinition
  extends IMessagingNotificationBaseDefinition,
    IMessageEventDescDefinition {}

export interface ICallNotificationDefinition
  extends IMessagingNotificationBaseDefinition,
    Pick<
      ICallEventDescDefinition,
      "incomingCallText" | "missedIncomingCallText"
    > {}
