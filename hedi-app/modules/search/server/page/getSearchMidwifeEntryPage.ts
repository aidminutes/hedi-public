import { IPageConfig } from "@/modules/shell/types";
import { IRegistration } from "@/modules/auth/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";

export const getSearchMidwifeEntryPage = async (
  content: IPage
): Promise<IRegistration & IPageConfig> => {
  content.type = "SearchMidwifeEntry";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "search-midwife-entry",
  };
  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
