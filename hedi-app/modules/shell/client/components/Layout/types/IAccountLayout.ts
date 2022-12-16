import { ILayout, IWithPosterImage } from "./ILayout";

export type AccountKind = "Account";

export interface IAccountLayout extends ILayout {
  kind: AccountKind;
}

export const isAccountLayout = (obj: ILayout): obj is IAccountLayout =>
  obj?.kind === "Account";
