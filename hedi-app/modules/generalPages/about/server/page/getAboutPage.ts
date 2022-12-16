import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IBlankLayout } from "@/modules/shell/client/components/Layout/types/IBlankLayout";

export const getAboutPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "About";

  const layout: IBlankLayout = {
    kind: "Blank",
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
