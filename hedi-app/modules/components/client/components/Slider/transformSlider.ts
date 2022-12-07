import { ISliderComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { SliderProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type ISliderProps = PartialBy<ISliderComponent, "kind"> &
  Omit<SliderProps, "labelText" | "id">;

export function transformSlider(props: ISliderProps): SliderProps {
  const { kind, labelText, ariaLabel, ...rest } = props;
  // TODO muss das anders?
  return {
    labelText: BasicHTML({ data: labelText }),
    "aria-label": ariaLabel,
    ...rest,
  };
}
