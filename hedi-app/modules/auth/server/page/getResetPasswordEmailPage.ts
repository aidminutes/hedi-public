import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";
import { IResetPasswordEmailView } from "../../types/IResetPasswordEmailView";

export const getResetPasswordEmailPage = async (
  content: IPage
): Promise<IResetPasswordEmailView & IPageConfig> => {
  content.type = "ResetPass-EmailView";

  const layout: IAccountLayout = {
    kind: "Account",
    id: "reset-pass-email-form",
  };

  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
