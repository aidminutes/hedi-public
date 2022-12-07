import { ILayout } from "./ILayout";

export type BlankKind = "Blank";

export interface IBlankLayout extends ILayout {
  kind: BlankKind;
}

export const isBlankLayout = (obj: ILayout): obj is IBlankLayout =>
  obj?.kind === "Blank";
