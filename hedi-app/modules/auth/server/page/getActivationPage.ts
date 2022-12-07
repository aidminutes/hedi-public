import { IPageConfig } from "@/modules/shell/types";
import { IActivation } from "@/modules/auth/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";

export const getActivationPage = async (
  content: IPage
): Promise<IActivation & IPageConfig> => {
  content.type = "Activation";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "register-form",
  };

  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
