import { MatrixClient } from "matrix-js-sdk";
import { CallType, MatrixCall } from "matrix-js-sdk/lib/webrtc/call";

export interface IMessagingContext {
  client: MatrixClient | null;
  tryLoadClient: () => void;
  callSession: ICallSession;
}

export interface ICallSession {
  createCall: (callType: CallType, roomId: string) => void;
  matrixCall: MatrixCall | null;
  callStart: number | null;
}
