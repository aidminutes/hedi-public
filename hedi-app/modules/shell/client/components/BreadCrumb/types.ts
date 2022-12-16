import { ILinkComponent } from "@/modules/components";
import { IEntityLocalized, IWithType } from "@/modules/model";
import { IWithAppStyle, IWithRouteLabel } from "@/modules/editorial/types";

export type IBreadCrumb = IBreadCrumbContent &
  IBreadCrumbDefinition &
  IBreadCrumbConfig;

export type IBreadCrumbContent = IEntityLocalized &
  IWithType &
  IWithRouteLabel &
  Partial<IWithAppStyle>;

export interface IBreadCrumbDefinition {
  backLink?: ILinkComponent;
}

export type BreadcrumbType = "standard" | "withoutTitle" | "graphical";

export interface IBreadCrumbConfig {
  breadcrumbType?: BreadcrumbType;
  notLinked?: boolean;
  pathLimit?: number;
}
