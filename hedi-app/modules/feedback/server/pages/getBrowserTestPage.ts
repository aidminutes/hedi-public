import { IPageConfig } from "@/modules/shell/types";

import { IPage } from "@/modules/common/types";
import { IFullWidthLayout } from "@/modules/shell/client/components/Layout/types/IFullWidthLayout";
import { getLayoutPosterImage } from "@/modules/shell/utils";

export const getBrowserTestPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "BrowserTest";
  const poster = getLayoutPosterImage(content.components);
  const layout: IFullWidthLayout = {
    kind: "FullWidth",
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
