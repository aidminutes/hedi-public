import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getMidwifeCareDetailsPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "MidwifeCareDetails";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "my-midwife-cares",
  };

  const shell: IPageConfig = {
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
