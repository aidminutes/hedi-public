import { ILayout, IWithPosterImage } from "./ILayout";

export type GridColumnKind = "GridColumn";

export interface IGridColumnLayout extends ILayout, Partial<IWithPosterImage> {
  kind: GridColumnKind;
  headline: string;
}

export const isGridColumnLayout = (obj: ILayout): obj is IGridColumnLayout =>
  obj?.kind === "GridColumn";
