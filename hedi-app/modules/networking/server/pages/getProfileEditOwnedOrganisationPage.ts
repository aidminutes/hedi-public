import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getProfileEditOwnedOrganisationPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileEditOwnedOrganisation";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "account-edit-owned-organisation",
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
