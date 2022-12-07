import React from "react";
import { transformBody, IBodyProps } from "./transformBody";
import { HTML } from "@/modules/react/html";

export const Body = (props: IBodyProps) => {
  const { body, ...rest } = transformBody(props);

  return <HTML data={body} {...rest} />;
};
