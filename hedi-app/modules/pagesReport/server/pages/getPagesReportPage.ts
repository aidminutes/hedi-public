import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IBlankLayout } from "@/modules/shell/client/components/Layout/types/IBlankLayout";

export const getPagesReportPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "PagesReport";

  const layout: IBlankLayout = {
    kind: "Blank",
  };

  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
