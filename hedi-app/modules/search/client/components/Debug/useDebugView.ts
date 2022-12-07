import { useState, useEffect } from "react";

export function useDebugView(show: Boolean) {
  const [isDebugView, setIsDebugView] = useState(show);

  useEffect(() => {
    setIsDebugView(show);
  }, [show]);

  return { isDebugView };
}
