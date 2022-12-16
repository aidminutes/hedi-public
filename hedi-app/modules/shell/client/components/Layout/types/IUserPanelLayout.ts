import { ILayout } from "./ILayout";

export type UserPanelKind = "UserPanel";

export interface IUserPanelLayout extends ILayout {
  kind: UserPanelKind;
}

export const isUserPanelLayout = (obj: ILayout): obj is IUserPanelLayout =>
  obj?.kind === "UserPanel";
