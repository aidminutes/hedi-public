import { IState } from "@/modules/model";
import { ChipTagProps, Tag, TagTypeName } from "carbon-components-react";
import { FCProps } from "carbon-components-react/typings/shared";
import React from "react";
interface IStateTagProps extends FCProps<ChipTagProps> {
  state: IState;
}
export const StateTag = (props: IStateTagProps) => {
  const { state, ...rest } = props;
  const { route } = state;

  let tagType: TagTypeName;
  tagType = "gray";
  if (
    route.endsWith(".read") ||
    route.endsWith("tentative") ||
    route.endsWith("unread") ||
    route.endsWith("active")
  ) {
    tagType = "blue";
  }
  if (
    route.endsWith("dismissed") ||
    route.endsWith("cancelled") ||
    route.endsWith("rejected")
  ) {
    tagType = "gray";
  }
  if (route.endsWith("rejected")) {
    tagType = "magenta";
  }
  if (route.endsWith("handshaking")) {
    tagType = "teal";
  }
  if (route.endsWith("completed")) {
    tagType = "purple";
  }

  return (
    <Tag {...rest} type={tagType}>
      {props.children}
    </Tag>
  );
};
