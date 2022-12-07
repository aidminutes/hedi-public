import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";
import { IPasswordChange } from "../../types/IPasswordChange";

export const getPasswordChangePage = async (
  content: IPage
): Promise<IPasswordChange & IPageConfig> => {
  content.type = "PasswordChange";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "password-change-form",
  };

  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
