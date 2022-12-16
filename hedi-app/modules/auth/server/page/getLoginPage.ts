import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { ILogin } from "@/modules/auth/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";
export const getLoginPage = async (
  content: IPage
): Promise<ILogin & IPageConfig> => {
  content.type = "Login";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "login-form",
  };

  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};

// TODO move to Login
