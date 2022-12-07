import { IPageConfig } from "@/modules/shell/types";
import { IRegistration } from "@/modules/auth/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";

export const getSearchMidwifeDonePage = async (
  content: IPage
): Promise<IRegistration & IPageConfig> => {
  content.type = "SearchMidwifeDone";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "search-midwife-done",
  };
  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
