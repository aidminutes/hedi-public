import React from "react";
import { Slider as CarbonSlider } from "carbon-components-react";
import { ISliderProps, transformSlider } from "./transformSlider";
export const Slider = (props: ISliderProps) => {
  const data = transformSlider(props);
  return <CarbonSlider {...data} />;
};
