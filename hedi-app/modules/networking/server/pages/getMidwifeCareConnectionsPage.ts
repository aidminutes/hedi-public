import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getMidwifeCareConnectionsPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "MidwifeCareConnections";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "midwife-care-connection",
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
