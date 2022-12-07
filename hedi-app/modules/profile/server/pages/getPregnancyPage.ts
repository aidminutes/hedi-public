import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";
import { IWideGridLayout } from "@/modules/shell/client/components/Layout/types/IWideGridLayout";

export const getPregnancyPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "Pregnancy";

  const { isPartOfWizard } = content;

  if (!!isPartOfWizard) {
    // in case of wizard, the layout is without sidebar.
    const layout: IWideGridLayout = {
      kind: "WideGrid",
      id: "account-pregnancy",
    };
    const shell: IPageConfig = {
      layout,
    };

    return {
      ...content,
      ...shell,
    };
  }

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "account-pregnancy",
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
