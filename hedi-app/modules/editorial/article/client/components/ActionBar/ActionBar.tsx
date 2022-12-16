import React from "react";
import { useActionBar } from "./useActionBar";
import { Seperator } from "@/modules/common/client/components";
import { ActionBarItem } from "./ActionBarItem";
import { IActionBarProps } from "@/modules/editorial/article/types";

export const ActionBar = (props: IActionBarProps) => {
  const { hasActionBar, actions, children } = useActionBar(props);

  if (!hasActionBar) return null;
  return (
    <div className="hedi--action-bar">
      <div className="hedi--action-bar__items">
        {actions?.map((action, index) => (
          <ActionBarItem key={action.iconDescription + index} action={action} />
        ))}
        {children && children}
      </div>
      <Seperator color="gray" />
    </div>
  );
};
