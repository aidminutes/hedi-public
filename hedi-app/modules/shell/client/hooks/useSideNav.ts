import { useState } from "react";

export function useSideNav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSideNav = () => {
    setIsExpanded(prev => !prev);
  };

  return {
    isExpanded,
    toggleSideNav,
  };
}
