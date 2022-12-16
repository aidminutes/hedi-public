import { IPageConfig } from "@/modules/shell/types";
import { IRegistration } from "@/modules/auth/types";
import { IPage } from "@/modules/common/types";
import { IAccountLayout } from "@/modules/shell/client/components/Layout/types/IAccountLayout";
import {
  filterGroupInstanceByProfession,
  findGroupInstance,
} from "@/modules/components";
import { IFullWidthLayout } from "@/modules/shell/client/components/Layout/types/IFullWidthLayout";

export const getSearchMidwifeWizardPage = async (
  content: IPage
): Promise<IRegistration & IPageConfig> => {
  content.type = "SearchMidwifeWizard";

  return {
    ...content,
  };
};
