import { IPageConfig } from "@/modules/shell/types";
import { IRegistration } from "@/modules/auth/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";

export const getPregnantUserCardPage = async (
  content: IPage
): Promise<IRegistration & IPageConfig> => {
  content.type = "PregnantUserCard";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "Pregnant-user-card",
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
