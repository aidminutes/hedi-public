import React from "react";
import { Tooltip, TooltipProps } from "carbon-components-react";
import { Direction } from "carbon-components-react/typings/shared";
import { ICopyLinkToClipboard } from "./types";
import { getRenderIcon } from "./getRenderIcon";
import { composeUrl } from "./composeUrl";
import { useCopyToClipboard } from "./useCopyToClipboard";

export const CopyLinkToClipboard = (props: ICopyLinkToClipboard) => {
  const { route, notificationText, type, size, description } = props;
  const url = composeUrl(route);

  const { addToClipboard, notificationData, isActive } = useCopyToClipboard(
    url ?? "",
    notificationText
  );

  const tooltipIconProps = {
    renderIcon: getRenderIcon(size),
    direction: "bottom" as Direction,
    tabIndex: 0,
    focusTrap: true,
    align: "start",
  } as TooltipProps;
  // TODO take out class and handle margin different
  switch (type) {
    case "actionbaritem": {
      return (
        <div
          onClick={() => addToClipboard()}
          className="hedi--action-bar__item hedi-action-bar__item--no-margin">
          <Tooltip
            {...tooltipIconProps}
            open={isActive}
            onChange={() => addToClipboard()}>
            <p>{notificationData.title}</p>
          </Tooltip>
          <div onClick={() => addToClipboard()}>
            {description && description}
          </div>
        </div>
      );
    }
    default: {
      return (
        <div className="hedi--copy-to-clipboard">
          <div
            className="hedi--copy-to-clipboard__icon"
            onClick={() => addToClipboard()}>
            <Tooltip
              {...tooltipIconProps}
              open={isActive}
              onChange={() => addToClipboard()}>
              <p>{notificationData.title}</p>
            </Tooltip>
          </div>
        </div>
      );
    }
  }
};
