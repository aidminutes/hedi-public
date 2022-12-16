import { IPageConfig } from "@/modules/shell/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getSysMessageDetailPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "SysMessageDetail";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "account-notifications",
  };

  const shell: IPageConfig = {
    revalidate: 1,
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
