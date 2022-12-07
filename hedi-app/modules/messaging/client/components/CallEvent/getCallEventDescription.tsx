import {
  PhoneBlockFilled16,
  PhoneFilled16,
  PhoneIncomingFilled16,
  PhoneOutgoingFilled16,
} from "@carbon/icons-react";
import { ICallEventDescDefinition, MatrixCallEvent } from "./types";

export function getCallEventDescription(
  event: MatrixCallEvent,
  isOwnEvent: boolean | undefined,
  callEventDescDefinition: ICallEventDescDefinition
) {
  const {
    incomingText,
    outgoingText,
    hangupText,
    acceptedCallText,
    abortedCallText,
    calleeUnavailableText,
    missedIncomingCallText,
    rejectedIncomingCallText,
    rejectedOutgoingCallText,
  } = callEventDescDefinition;

  switch (event.event.type) {
    case "m.call.candidates":
      return {
        icon: (
          <PhoneIncomingFilled16
            style={{ color: "#2a84c6", marginRight: "0.25rem" }}
          />
        ),
        text: incomingText,
      };
    case "m.call.answer":
      return {
        icon: (
          <PhoneFilled16 style={{ color: "#4aa80a", marginRight: "0.25rem" }} />
        ),
        text: acceptedCallText,
      };
    case "m.call.hangup":
      if (event.event.content?.reason === "invite_timeout") {
        return {
          icon: (
            <PhoneFilled16
              style={{ color: "#a80808", marginRight: "0.25rem" }}
            />
          ),
          text: !!isOwnEvent ? calleeUnavailableText : missedIncomingCallText,
        };
      } else if (event.event.content?.reason === "user_hangup") {
        return {
          icon: (
            <PhoneFilled16
              style={{ color: "#a80808", marginRight: "0.25rem" }}
            />
          ),
          text: hangupText,
        };
      } else {
        return {
          icon: (
            <PhoneFilled16
              style={{ color: "#a80808", marginRight: "0.25rem" }}
            />
          ),
          text: abortedCallText,
        };
      }
    case "m.call.reject":
      return {
        icon: (
          <PhoneBlockFilled16
            style={{ color: "#a80808", marginRight: "0.25rem" }}
          />
        ),
        text: !!isOwnEvent
          ? rejectedIncomingCallText
          : rejectedOutgoingCallText,
      };
    case "m.call.invite":
      if (!!isOwnEvent) {
        return {
          icon: (
            <PhoneOutgoingFilled16
              style={{ color: "#2a84c6", marginRight: "0.25rem" }}
            />
          ),
          text: outgoingText,
        };
      } else {
        return {
          icon: (
            <PhoneIncomingFilled16
              style={{ color: "#2a84c6", marginRight: "0.25rem" }}
            />
          ),
          text: incomingText,
        };
      }
    default:
      return null;
  }
}
