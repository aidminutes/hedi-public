import { ILinkComponent } from "@/modules/components/types";
import { BreadcrumbType, IBreadCrumb, IBreadCrumbContent } from "./types";

export function parseIBreadCrumb<T extends IBreadCrumbContent>(
  content: T,
  backLink?: ILinkComponent,
  breadcrumbType?: BreadcrumbType
): IBreadCrumb {
  const { type, lang, routelabel, route, label, appStyle } = content;
  return {
    type,
    lang,
    routelabel,
    route,
    label,
    appStyle,
    backLink,
    breadcrumbType,
  };
}
