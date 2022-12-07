import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getServicesPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileServices";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "profile-services",
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
