import { IShellConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { isGridColumnLayout } from "../../client/components/Layout/types/IGridColumnLayout";
import { ILayout } from "../../client/components/Layout/types/ILayout";
import { isFullWidthLayout } from "../../client/components/Layout/types/IFullWidthLayout";
import { isTitleOutsideLayout } from "../../client/components/Layout/types/ITitleOutsideLayout";
import { StylesCache } from "@/modules/media/server/cache/StylesCache";

interface ILayoutProps extends Partial<Pick<IPage, "id" | "components">> {}
export function getLayout(content: ILayoutProps & IShellConfig) {
  const { id, layout } = content;
  let shell: IShellConfig;
  if (!layout) return;
  const transformedLayout: ILayout = layout;

  if (
    isGridColumnLayout(transformedLayout) ||
    isFullWidthLayout(transformedLayout) ||
    isTitleOutsideLayout(transformedLayout)
  )
    transformedLayout.poster = StylesCache.swap(
      transformedLayout.poster,
      "header"
    ) ?? {
      kind: "Image",
      label: "",
      route: "",
      width: 1,
      height: 1,
    };

  transformedLayout["id"] = id;

  shell = {
    layout: transformedLayout,
  };

  return { ...shell };
}
