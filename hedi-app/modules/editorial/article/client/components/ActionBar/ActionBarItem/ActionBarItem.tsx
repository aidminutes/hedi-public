import React from "react";
import {
  VolumeUp16,
  VolumeDown16,
  Share16,
  Bookmark16,
  Printer16,
  Earth16,
} from "@carbon/icons-react";
import { IActionBarAction, ActionBarType } from "../../../../types";
import {
  Button,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";

export interface IActionBarItem {
  action: IActionBarAction;
}

export const ActionBarItem = (props: IActionBarItem) => {
  const { action } = props;
  const { type, iconDescription, onClick, active, children } = action;

  if (type === "audio")
    return (
      <Button
        kind="ghost"
        renderIcon={active ? VolumeUp16 : VolumeDown16}
        hasIconOnly
        size="field"
        onClick={() => onClick()}
        iconDescription={iconDescription}
      />
    );

  return (
    <OverflowMenu
      renderIcon={getIconByType(type)}
      flipped={true}
      iconDescription="">
      {children &&
        children.map((child, index) => (
          <OverflowMenuItem
            key={index}
            itemText={child.iconDescription}
            onClick={() => child.onClick()}
          />
        ))}
    </OverflowMenu>
  );
};

const getIconByType = (type: ActionBarType) => {
  switch (type) {
    case "audio":
      return VolumeDown16;
    case "bookmark":
      return Bookmark16;
    case "language":
      return Earth16;
    case "print":
      return Printer16;
    case "share":
      return Share16;
  }
};
