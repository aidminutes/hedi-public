import { ILayout, IWithPosterImage } from "./ILayout";

export type FullWidthKind = "FullWidth";

export interface IFullWidthLayout extends ILayout, IWithPosterImage {
  kind: FullWidthKind;
}

export const isFullWidthLayout = (obj: ILayout): obj is IFullWidthLayout =>
  obj?.kind === "FullWidth";
