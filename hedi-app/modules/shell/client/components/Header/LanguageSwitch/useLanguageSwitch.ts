import { useState, useCallback } from "react";
import {
  ILanguageSwitchAction,
  ILanguageSwitchDefinition,
  ILanguageSwitchPanel,
} from "./types";

export function useLanguageSwitch(
  languageSwitch?: ILanguageSwitchDefinition,
  closeSideMenu = () => {}
): {
  languageSwitchAction?: ILanguageSwitchAction;
  languageSwitchPanel?: ILanguageSwitchPanel;
} {
  const [expanded, setExpanded] = useState(false);

  const onClick = useCallback(
    () =>
      setExpanded(p => {
        if (!p) {
          closeSideMenu();
        }
        return !p;
      }),
    []
  );
  const closeLanguageSwitch = useCallback(() => setExpanded(false), []);
  if (!languageSwitch) {
    return {};
  } else {
    const { renderIcon, iconDescription, labelText, options } = languageSwitch;
    const ariaLabel = iconDescription || labelText || "Sprache ändern";

    const languageSwitchAction: ILanguageSwitchAction = {
      renderIcon,
      iconDescription,
      labelText,
      "aria-label": ariaLabel,
      isActive: expanded,
      onClick,
    };

    const languageSwitchPanel: ILanguageSwitchPanel = {
      options,
      "aria-label": ariaLabel,
      expanded,
      onMouseLeave: closeLanguageSwitch,
      closeLanguageSwitch,
      onBlur: closeLanguageSwitch,
    };

    return {
      languageSwitchAction,
      languageSwitchPanel,
    };
  }
}
