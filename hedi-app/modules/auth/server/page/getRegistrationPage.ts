import { IPageConfig } from "@/modules/shell/types";
import { IRegistration } from "@/modules/auth/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";

export const getRegistrationPage = async (
  content: IPage
): Promise<IRegistration & IPageConfig> => {
  content.type = "Registration";

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
