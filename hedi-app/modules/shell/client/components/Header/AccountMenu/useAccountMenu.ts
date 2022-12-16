import { useState, useCallback } from "react";
import { IAccountMenu, IAccountMenuAction, IAccountMenuPanel } from "./types";
import { useAccountMenuComponent } from "./useAccountMenuComponent";

export function useAccountMenu(
  menuComponent?: IAccountMenu,
  lang = "de",
  closeSideMenu = () => {}
): {
  accountMenu?: IAccountMenu;
  accountMenuAction?: IAccountMenuAction;
  accountMenuPanel?: IAccountMenuPanel;
} {
  const [expanded, setExpanded] = useState(false);

  const { accountMenu } = useAccountMenuComponent(menuComponent, lang);

  const togglePanel = useCallback(
    () =>
      setExpanded(p => {
        if (!p) {
          closeSideMenu();
        }
        return !p;
      }),
    []
  );
  const closePanel = useCallback(() => setExpanded(false), []);

  if (!accountMenu) {
    return {};
  } else {
    const { renderIcon, iconDescription, labelText, components } = accountMenu;

    const accountMenuAction: IAccountMenuAction = {
      renderIcon,
      iconDescription,
      labelText,
      isActive: expanded,
      onClick: togglePanel,
    };

    const accountMenuPanel: IAccountMenuPanel = {
      iconDescription,
      labelText,
      components,
      expanded,
      onMouseLeave: closePanel,
      onClick: closePanel,
      onBlur: closePanel,
    };
    return {
      accountMenu,
      accountMenuAction,
      accountMenuPanel,
    };
  }
}
