import { useState, useEffect } from "react";
import { IActionBarProps } from "@/modules/editorial/article/types";

export function useActionBar(props: IActionBarProps) {
  const { actions, children } = props;
  const [hasActionBar, setHasActionBar] = useState(
    (actions && actions.length > 0) || !!children
  );

  useEffect(() => {
    setHasActionBar((actions && actions.length > 0) || !!children);
  }, [actions]);

  return {
    hasActionBar,
    actions: actions === undefined ? null : actions,
    children,
  };
}
