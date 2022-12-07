import { ILabelComponent } from "@/modules/components";
import { IWithAppStyle } from "@/modules/editorial/types";

export type IScrollToTop = Partial<IWithAppStyle> &
  IScrollToTopDefinition &
  IScrollToTopConfig;

export interface IScrollToTopDefinition {
  label?: ILabelComponent;
}

export interface IScrollToTopConfig {
  behavior?: ScrollBehavior;
  left?: number;
  top?: number;
}
