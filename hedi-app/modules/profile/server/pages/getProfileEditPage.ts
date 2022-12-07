import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getProfileEditPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileEdit";
  // TODO probably need to pull services for pageDefinition

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "account-edit-profile",
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
