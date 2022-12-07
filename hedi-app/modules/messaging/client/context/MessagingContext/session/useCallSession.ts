import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MatrixClient } from "matrix-js-sdk";
import {
  CallErrorCode,
  CallState,
  CallType,
  MatrixCall,
  CallEvent,
} from "matrix-js-sdk/lib/webrtc/call";

import { ICallSession } from "../types";
import { CallEventHandlerEvent } from "matrix-js-sdk/lib/webrtc/callEventHandler";

export const useCallSession = (
  client: MatrixClient | null,
  playIncomingRing: Dispatch<SetStateAction<boolean>>,
  playOutgoingRing: Dispatch<SetStateAction<boolean>>
): ICallSession => {
  const [matrixCall, setMatrixCall] = useState<MatrixCall | null>(null);
  const [callStart, setCallStart] = useState<number | null>(null);

  const createCall = useCallback(
    (callType: CallType, roomId: string) => {
      const matrixCall = client?.createCall(roomId);
      if (matrixCall) {
        playOutgoingRing(true);
        // Place a new call
        setMatrixCall(matrixCall);

        matrixCall.placeCall(true, callType === CallType.Video);
      }
    },
    [client]
  );

  const callSession = useMemo<ICallSession>(
    () => ({ callStart, createCall, matrixCall }),
    [callStart, createCall, matrixCall]
  );

  // matrixCall error lissener
  useEffect(() => {
    if (!!matrixCall) {
      const callErrorListener = (e: any) => {
        matrixCall?.hangup(CallErrorCode.UserHangup, false);
      };

      matrixCall.on(CallEvent.Error, callErrorListener);

      return () => {
        matrixCall.removeListener(CallEvent.Error, callErrorListener);
      };
    }
  }, [matrixCall]);

  //callStateChangeListener
  useEffect(() => {
    if (!!matrixCall) {
      const callStateChangeListener = (newState: CallState) => {
        switch (newState) {
          case CallState.Connected:
            playOutgoingRing(false);
            playIncomingRing(false);
            setCallStart(Date.now());
            break;
          case CallState.Ended:
            playIncomingRing(false);
            playOutgoingRing(false);
            setMatrixCall(null);
            setCallStart(null);
            break;
        }
      };
      matrixCall.on(CallEvent.State, callStateChangeListener);
      return () => {
        matrixCall.removeListener(CallEvent.State, callStateChangeListener);
      };
    }
  }, [matrixCall]);

  useEffect(() => {
    const incomingCallListener = (incomingCall: MatrixCall) => {
      // If incoming call is already handled
      // skip this event
      if (incomingCall.callId === matrixCall?.callId) {
        return;
      }

      //there is a Active call already
      if (matrixCall !== null) {
        // Reject incoming calls when user is in call
        incomingCall.reject();
      } else {
        setMatrixCall(incomingCall);
        playIncomingRing(true);
      }
    };

    client?.on(CallEventHandlerEvent.Incoming, incomingCallListener);
    return () => {
      client?.removeListener(
        CallEventHandlerEvent.Incoming,
        incomingCallListener
      );
    };
  }, [client, matrixCall]);

  return callSession;
};
