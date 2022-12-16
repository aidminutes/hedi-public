import { ILayout, IWithPosterImage } from "./ILayout";

export type WideGridKind = "WideGrid";

export interface IWideGridLayout extends ILayout {
  kind: WideGridKind;
}

export const isWideGridLayout = (obj: ILayout): obj is IWideGridLayout =>
  obj?.kind === "WideGrid";
