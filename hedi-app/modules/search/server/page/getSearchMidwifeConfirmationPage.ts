import { IPageConfig } from "@/modules/shell/types";
import { IRegistration } from "@/modules/auth/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";

export const getSearchMidwifeConfirmationPage = async (
  content: IPage
): Promise<IRegistration & IPageConfig> => {
  content.type = "SearchMidwifeConfirmation";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "search-midwife-confirmation",
  };
  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
