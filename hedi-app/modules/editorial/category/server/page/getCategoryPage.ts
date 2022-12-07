import { ICategory, ICategoryView } from "../../types";
import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import {
  findLinkInstance,
  imageToImageComponent,
} from "@/modules/components/types";
import { getPageById } from "@/modules/common/server";
import { IBreadCrumb } from "@/modules/shell/client/components/BreadCrumb/types";
import { StylesCache } from "@/modules/media/server/cache";
import { DefinitionCache } from "@/modules/common/server/cache/DefinitionCache";
import { ITitleOutsideLayout } from "@/modules/shell/client/components/Layout/types/ITitleOutsideLayout";

export const getCategoryPage = async (
  content: ICategory
): Promise<ICategoryView & IPageConfig> => {
  const { lang, route, routelabel, label, appStyle } = content;

  content.categories = StylesCache.swapInEntities(content.categories, "square");

  const meta: IMetaInfo = { indexing: true };
  const fetcher = getPageById(lang, "categoryDefinition");
  const { components } = await DefinitionCache.get(
    "categoryDefinition",
    lang,
    fetcher
  );

  const backLink = findLinkInstance(components, "beforeBreadcrumbLink");
  const breadcrumb: IBreadCrumb = {
    breadcrumbType: "standard",
    lang,
    routelabel,
    route,
    label,
    type: "Article",
    appStyle,
    backLink,
  };

  const layout: ITitleOutsideLayout = {
    kind: "TitleOutside",
    poster: imageToImageComponent(content.image) ?? {
      kind: "Image",
      label: "",
      route: "",
      width: 256,
      height: 256,
    },
    breadcrumbs: { ...breadcrumb },
    headline: content.label,
  };
  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    components,
    ...shell,
    meta,
  };
};
