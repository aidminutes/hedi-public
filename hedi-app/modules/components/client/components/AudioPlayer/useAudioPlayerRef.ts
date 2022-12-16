import { useRef, useEffect } from "react";
export function useAudioPlayerRef(isVisible: boolean) {
  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playerRef.current && !isVisible) playerRef.current.pause();
  }, [isVisible]);

  return { playerRef };
}
