import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IFullWidthLayout } from "@/modules/shell/client/components/Layout/types/IFullWidthLayout";
import { getLayoutPosterImage } from "@/modules/shell/utils";
export const getFaq = async (content: IPage): Promise<IPage & IPageConfig> => {
  content.type = "FAQ";

  const poster = getLayoutPosterImage(content.components);

  const layout: IFullWidthLayout = {
    kind: "FullWidth",
    id: "faq",
    poster,
  };
  const meta: IMetaInfo = { indexing: true };
  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
    meta,
  };
};
