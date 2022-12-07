import React from "react";
import { IWithType } from "@/modules/model";
import { SysMessageDetailView } from "./SysMessageDetail";
import { ISysMessageDetailView } from "../../types/ISysMessageDetailView";
import { SysMessageList, SysMessageListView } from "./SysMessageList";
import { UserPanel } from "@/modules/common/client/components/UserPanel";

export const TrySysMessage = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  switch (content.type) {
    case "SysMessageDetail":
      return (
        <SysMessageDetailView
          content={content as ISysMessageDetailView}
          key="sysmessagedetail"
        />
      );
    case "SysMessages":
      return (
        <SysMessageList
          content={content as SysMessageListView}
          key="sysmessages"
        />
      );
    default:
      return null;
  }
};
