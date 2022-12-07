import { useState, useCallback } from "react";
import { ISideMenuDefinition, ISideMenuButton, ISideMenuPanel } from "./types";

export function useSideMenu(menus: ISideMenuDefinition) {
  const [expanded, setExpanded] = useState(false);
  const closeSideMenu = useCallback(() => setExpanded(false), []);
  const toggleSideMenu = useCallback(() => setExpanded(exp => !exp), []);

  const sideMenuButton: ISideMenuButton = {
    isActive: expanded,
    onClick: toggleSideMenu,
  };

  const sideMenuPanel: ISideMenuPanel = {
    ...menus,
    expanded,
    addFocusListeners: true,
    addMouseListeners: true,
    onToggle: toggleSideMenu,
    onOverlayClick: closeSideMenu,
  };

  return {
    sideMenuButton,
    sideMenuPanel,
    closeSideMenu,
  };
}
