import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface IRingtonesState {
  Ringtones: JSX.Element;
  playIncomingRing: Dispatch<SetStateAction<boolean>>;
  playOutgoingRing: Dispatch<SetStateAction<boolean>>;
}

export const useRingtones = (): IRingtonesState => {
  const incomingCallRingRef = useRef<HTMLAudioElement>(null);
  const [isIncomingRinging, playIncomingRing] = useState<boolean>(false);
  const outgoingCallRingRef = useRef<HTMLAudioElement>(null);
  const [isOutgoingRinging, playOutgoingRing] = useState<boolean>(false);

  const Ringtones = useMemo(
    () => (
      <>
        <audio
          ref={incomingCallRingRef}
          style={{ display: "none" }}
          controls
          src="/sounds/ringtone-incoming.mp3"
        />
        <audio
          ref={outgoingCallRingRef}
          style={{ display: "none" }}
          controls
          src="/sounds/ringtone-outgoing.mp3"
        />
      </>
    ),
    []
  );

  // NOTE refs and setstates keep identity,
  // using memo to keep identity of returned
  const ringtonesState = useMemo(
    () => ({
      Ringtones,
      playIncomingRing,
      playOutgoingRing,
    }),
    []
  );

  // Prepare ringtone audio elements with the first touch of the user
  useEffect(() => {
    const ringtonePreparationListener = () => {
      if (!incomingCallRingRef.current || !outgoingCallRingRef.current) {
        return;
      }

      incomingCallRingRef.current.muted = true;
      incomingCallRingRef.current
        .play()
        .catch(_ => null)
        .then(_ => {
          if (incomingCallRingRef.current) {
            incomingCallRingRef.current.pause();
            incomingCallRingRef.current.currentTime = 0;
            incomingCallRingRef.current.muted = false;
          }
        });
      outgoingCallRingRef.current.muted = true;
      outgoingCallRingRef.current
        .play()
        .catch(_ => null)
        .then(_ => {
          if (outgoingCallRingRef.current) {
            outgoingCallRingRef.current.pause();
            outgoingCallRingRef.current.currentTime = 0;
            outgoingCallRingRef.current.muted = false;
          }
        });

      document.removeEventListener("click", ringtonePreparationListener);
      document.removeEventListener("touchstart", ringtonePreparationListener);
    };

    document.addEventListener("click", ringtonePreparationListener);
    document.addEventListener("touchstart", ringtonePreparationListener);

    return () => {
      document.removeEventListener("click", ringtonePreparationListener);
      document.removeEventListener("touchstart", ringtonePreparationListener);
    };
  }, [incomingCallRingRef, outgoingCallRingRef]);

  // play pause incomingCallAudio
  useEffect(() => {
    if (!incomingCallRingRef.current) {
      return;
    }
    if (isIncomingRinging) {
      incomingCallRingRef.current.loop = true;
      incomingCallRingRef.current.play().catch(_ => null);
    }

    if (!isIncomingRinging && !incomingCallRingRef.current.paused) {
      incomingCallRingRef.current.pause();
      incomingCallRingRef.current.currentTime = 0;
    }
  }, [isIncomingRinging, incomingCallRingRef]);

  // play pause outgoingCallAudio
  useEffect(() => {
    if (!outgoingCallRingRef.current) {
      return;
    }

    if (isOutgoingRinging) {
      outgoingCallRingRef.current.loop = true;
      outgoingCallRingRef.current.play().catch(_ => null);
    }

    if (!isOutgoingRinging && !outgoingCallRingRef.current.paused) {
      outgoingCallRingRef.current.pause();
      outgoingCallRingRef.current.currentTime = 0;
    }
  }, [isOutgoingRinging, outgoingCallRingRef]);

  return ringtonesState;
};
