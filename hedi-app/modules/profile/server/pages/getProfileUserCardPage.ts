import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getProfileUserCardPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileUserCard";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "account-profile-user-card",
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
