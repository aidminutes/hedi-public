import React, { useState } from "react";

export function useToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return {
    isVisible,
    toggleVisibility,
  };
}
