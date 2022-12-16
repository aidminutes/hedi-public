import React from "react";

export interface WhiteBoxProps {}

export const WhiteBox: React.FC<WhiteBoxProps> = props => {
  return <div className="hedi--white-box">{props.children}</div>;
};
