// myMidwifeCares
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getMyMidwifeCaresPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "MyMidwifeCares";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "my-midwife-cares",
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
