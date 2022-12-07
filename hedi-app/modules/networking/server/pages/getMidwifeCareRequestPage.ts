import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getMidwifeCareRequestPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "MidwifeCareRequest";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "midwife-care-request",
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
