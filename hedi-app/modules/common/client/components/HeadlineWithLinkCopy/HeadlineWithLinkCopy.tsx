import React from "react";
import { CopyLinkToClipboard } from "../CopyLinkToClipboard";
import { Headline } from "@/modules/components";
import { IHeadlineWithLinkCopy } from "./types";
import { ICopyLinkToClipboard } from "../CopyLinkToClipboard/types";

export const HeadlineWithLinkCopy = (props: IHeadlineWithLinkCopy) => {
  const {
    route,
    notificationText,
    type,
    size,
    description,
    ...headline
  } = props;
  const anchor = headline.anchor;
  const copyLinkToClipboard: ICopyLinkToClipboard = {
    route: (route ?? "") + "#" + anchor,
    notificationText,
    type,
    size,
    description,
  };
  return (
    <div className="hedi--headline-copy-link-to-clipboard">
      <Headline {...headline} />
      {route && anchor && <CopyLinkToClipboard {...copyLinkToClipboard} />}
    </div>
  );
};
