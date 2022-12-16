import { getLabelInstance, IComponent } from "@/modules/components";
import { ICallEventDefinition } from "./types";

export const getCallEventDefinition = (
  components: IComponent[]
): ICallEventDefinition => {
  return {
    incomingText:
      getLabelInstance(components, "incoming", {
        labelKind: "span",
        text: "Eingehend",
      }).text ?? "Eingehend",
    outgoingText:
      getLabelInstance(components, "outgoing", {
        labelKind: "span",
        text: "Ausgehend",
      }).text ?? "Ausgehend",
    hangupText:
      getLabelInstance(components, "hangup", {
        labelKind: "span",
        text: "Aufgelegt",
      }).text ?? "Aufgelegt",
    acceptedCallText:
      getLabelInstance(components, "acceptedCall", {
        labelKind: "span",
        text: "Anruf angenommen",
      }).text ?? "Anruf angenommen",
    abortedCallText:
      getLabelInstance(components, "abortedCall", {
        labelKind: "span",
        text: "Anruf abgebrochen",
      }).text ?? "Anruf abgebrochen",
    calleeUnavailableText:
      getLabelInstance(components, "calleeUnavailable", {
        labelKind: "span",
        text: "Gesprächspartner leider nicht erreichbar",
      }).text ?? "Gesprächspartner leider nicht erreichbar",
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
    rejectedIncomingCallText:
      getLabelInstance(components, "rejectedIncomingCall", {
        labelKind: "span",
        text: "Eingehenden Anruf abgelehnt",
      }).text ?? "Eingehenden Anruf abgelehnt",
    rejectedOutgoingCallText:
      getLabelInstance(components, "rejectedOutgoingCall", {
        labelKind: "span",
        text: "Ausgehender Anruf abgelehnt",
      }).text ?? "Ausgehender Anruf abgelehnt",
  };
};
