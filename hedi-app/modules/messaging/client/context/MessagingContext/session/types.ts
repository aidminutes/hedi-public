import { CallType, MatrixCall } from "matrix-js-sdk/lib/webrtc/call";

export interface ICallSession {
  createCall: (callType: CallType, roomId: string) => void;
  matrixCall: MatrixCall | null;
  callStart: number | null;
}
