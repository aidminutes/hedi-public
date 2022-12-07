import React, { createElement } from "react";
import { transformSvg, ISvgProps } from "./transformSvg";
export const Svg = (props: ISvgProps) => {
  const data = transformSvg(props);

  return <img {...data} />;
};
