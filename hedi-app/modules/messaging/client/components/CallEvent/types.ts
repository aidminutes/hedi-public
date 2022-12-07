import { IEvent, MatrixEvent } from "matrix-js-sdk/lib/models/event";

export type ICallEvent = ICallEventContent & ICallEventDefinition;

export type CallEventType = `m.call.${string}`;

export type MatrixCallEvent = MatrixEvent & {
  event: Partial<IEvent> & { type: CallEventType };
};

export interface ICallEventContent {
  event: MatrixCallEvent;
  isOwnEvent?: boolean;
  formattedEventDate?: string;
}

export interface ICallEventDefinition extends ICallEventDescDefinition {}

export interface ICallEventDescDefinition {
  incomingText: string;
  outgoingText: string;
  hangupText: string;
  acceptedCallText: string;
  abortedCallText: string;
  calleeUnavailableText: string;
  incomingCallText: string;
  missedIncomingCallText: string;
  rejectedIncomingCallText: string;
  rejectedOutgoingCallText: string;
}
