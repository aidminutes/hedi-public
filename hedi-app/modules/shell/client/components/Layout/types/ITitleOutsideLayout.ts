import { IBreadCrumb } from "../../BreadCrumb/types";
import { ILayout, IWithPosterImage } from "./ILayout";

export type TitleOutsideKind = "TitleOutside";

export interface ITitleOutsideLayout extends ILayout, IWithPosterImage {
  kind: TitleOutsideKind;
  headline: string;
  breadcrumbs?: IBreadCrumb;
}

export const isTitleOutsideLayout = (
  obj: ILayout
): obj is ITitleOutsideLayout => obj?.kind === "TitleOutside";
