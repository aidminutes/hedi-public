import { Dimension } from "./Dimension";

export type ImageStyle = Record<string, Dimension>;

export interface IWithImageStyles {
  imageStyles: ImageStyle;
}
