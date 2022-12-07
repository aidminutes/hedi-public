import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IGridColumnLayout } from "@/modules/shell/client/components/Layout/types/IGridColumnLayout";
import {
  findLayoutPosterImage,
  getLayoutPageHeadline,
} from "@/modules/shell/utils";

export const getPagePage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  const headline = getLayoutPageHeadline(content.components, content.label);
  const meta: IMetaInfo = { indexing: true };
  const layout: IGridColumnLayout = {
    kind: "GridColumn",
    headline,
  };

  const poster = findLayoutPosterImage(content.components);
  if (poster) layout.poster = poster;

  const shell: IPageConfig = { layout };
  return {
    ...content,
    ...shell,
    meta,
  };
};
