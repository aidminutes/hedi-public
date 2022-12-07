import { findLabelInstance, findLinkInstance } from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { IBreadCrumb } from "@/modules/shell/client/components/BreadCrumb/types";
import { ITitleOutsideLayout } from "@/modules/shell/client/components/Layout/types/ITitleOutsideLayout";
import { IPageConfig } from "@/modules/shell/types";
import { getLayoutPosterImage } from "@/modules/shell/utils";

export const getSearchPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "Search";
  const { lang, route, label, components } = content;

  const backLink = findLinkInstance(components, "beforeBreadcrumbLink");
  const mainHeadline = findLabelInstance(components, "mainHeadline");

  const breadcrumb: IBreadCrumb = {
    breadcrumbType: "withoutTitle",
    lang,
    routelabel: label,
    route,
    label,
    type: "Search",
    backLink,
  };

  const poster = getLayoutPosterImage(content.components);

  const layout: ITitleOutsideLayout = {
    kind: "TitleOutside",
    breadcrumbs: { ...breadcrumb },
    headline: mainHeadline?.text ?? content.label,
    id: "search",
    poster,
  };

  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
