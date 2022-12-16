import { MatrixClient, Room } from "matrix-js-sdk";

export type ICall = ICallContent & ICallDefinition & ICallConfig;

export interface ICallContent {
  room: Room;
  client: MatrixClient;
  otherMemberAvatar?:string;
}

export interface ICallDefinition {
  answerCallButton: string;
  answerCallWithVideoButton: string;
  declineCallButton: string;
  videoOnButton: string;
  videoOffButton: string;
  microphoneOnButton: string;
  microphoneOffButton: string;
  hangUpButton: string;
}

export interface ICallConfig {}
