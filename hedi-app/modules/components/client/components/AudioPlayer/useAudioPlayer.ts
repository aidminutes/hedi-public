import { useState } from "react";
export function useAudioPlayer() {
  const [showPlayer, setShowPlayer] = useState(false);

  return { showPlayer, setShowPlayer };
}
