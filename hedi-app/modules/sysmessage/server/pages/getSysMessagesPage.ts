import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { SysMessageListView } from "../../client/components";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getSysMessagesPage = async (
  content: IPage
): Promise<SysMessageListView & IPageConfig> => {
  content.type = "SysMessages";

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
