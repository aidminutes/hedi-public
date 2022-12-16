import {
  getLabelInstance,
  getLinkInstance,
  IComponent,
} from "@/modules/components";
import { getMessageEventDescDefinition } from "../../../components/MessageEvent/getMessageEventDescDefinition";
import {
  IMessagingNotificationBaseDefinition,
  IMessagingNotificationDefinition,
  IMessageNotificationDefinition,
  ICallNotificationDefinition,
} from "./types";

export const getMessagingNotificationDefinition = (
  components: IComponent[]
): IMessagingNotificationDefinition => {
  return {
    msgDef: getMessageNotificationDefinition(components),
    callDef: getCallNotificationDefinition(components),
  };
};

const getMessagingNotificationBaseDefinition = (
  components: IComponent[]
): IMessagingNotificationBaseDefinition => ({
  conversationRoute: getLinkInstance(components, "conversationLink", {
    href: "/de/konversation",
    labelText: "Unterhaltung",
  }).href,
});

const getMessageNotificationDefinition = (
  components: IComponent[]
): IMessageNotificationDefinition => ({
  ...getMessagingNotificationBaseDefinition(components),
  ...getMessageEventDescDefinition(components),
});

const getCallNotificationDefinition = (
  components: IComponent[]
): ICallNotificationDefinition => ({
  ...getMessagingNotificationBaseDefinition(components),
  incomingCallText:
    getLabelInstance(components, "incomingCall", {
      labelKind: "span",
      text: "Eingehender Anruf",
    }).text ?? "Eingehender Anruf",
  missedIncomingCallText:
    getLabelInstance(components, "missedIncomingCall", {
      labelKind: "span",
      text: "Eingehender Anruf verpasst",
    }).text ?? "Eingehender Anruf verpasst",
});
