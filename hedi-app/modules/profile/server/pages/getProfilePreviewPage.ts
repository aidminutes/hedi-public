import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";
import { IPageConfig } from "@/modules/shell/types";

export const getProfilePreviewPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfilePreview";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "account-profile-preview",
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
