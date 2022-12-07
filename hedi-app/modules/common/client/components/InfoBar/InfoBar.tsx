import React from "react";
import { Information20 } from "@carbon/icons-react";
import { Label } from "@/modules/components";

export const InfoBar = ({
  text,
  theme,
}: {
  text?: string;
  theme?: "orange";
}) => {
  return (
    <div
      className={"hedi--info-bar " + (theme ? "hedi--info-bar--" + theme : "")}>
      <span className="hedi--info-bar__content">
        <Information20 />
        <Label kind="Label" id="tooltip-body" labelKind="span" text={text} />
      </span>
    </div>
  );
};
