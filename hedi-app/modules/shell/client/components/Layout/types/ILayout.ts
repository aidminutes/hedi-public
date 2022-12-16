import { IImageComponent } from "@/modules/components/types";
import { BlankKind, IBlankLayout } from "./IBlankLayout";
import { FullWidthKind, IFullWidthLayout } from "./IFullWidthLayout";
import { GridColumnKind, IGridColumnLayout } from "./IGridColumnLayout";
import { ITitleOutsideLayout, TitleOutsideKind } from "./ITitleOutsideLayout";
import { IAccountLayout, AccountKind } from "./IAccountLayout";
import { IUserPanelLayout, UserPanelKind } from "./IUserPanelLayout";
import { WideGridKind } from "./IWideGridLayout";

export interface ILayout {
  kind: LayoutKind;
  id?: string;
  wrapperKey?: string;
  label?: string;
}

export interface IWithPosterImage {
  poster: IImageComponent;
}

export type LayoutKind =
  | never
  | FullWidthKind
  | TitleOutsideKind
  | BlankKind
  | GridColumnKind
  | AccountKind
  | UserPanelKind
  | WideGridKind;

export type Layout =
  | ITitleOutsideLayout
  | IFullWidthLayout
  | IBlankLayout
  | IGridColumnLayout
  | IAccountLayout
  | IUserPanelLayout;
