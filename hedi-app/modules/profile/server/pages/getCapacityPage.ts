import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getCapacityPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileCapacity";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "profile-capacity",
  };

  const shell: IPageConfig = {
    layout,
    redirectUnAuthorized: "/" + content.lang,
  };

  return {
    ...content,
    ...shell,
  };
};
