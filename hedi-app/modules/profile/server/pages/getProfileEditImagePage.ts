import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getProfileEditImagePage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileEditImage";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "account-edit-profile-image",
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
