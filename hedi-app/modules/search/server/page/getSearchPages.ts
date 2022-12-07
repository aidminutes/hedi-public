import { IPage } from "@/modules/common/types/IPage";
import { IPageConfig } from "@/modules/shell/types";
import { getSearchMidwifeConfirmationPage } from "./getSearchMidwifeConfirmationPage";
import { getSearchMidwifeDonePage } from "./getSearchMidwifeDonePage";
import { getSearchMidwifeEntryPage } from "./getSearchMidwifeEntryPage";
import { getSearchMidwifePage } from "./getSearchMidwifeViewPage";
import { getSearchMidwifeWizardPage } from "./getSearchMidwifeWizardPage";
import { getSearchProfilePage } from "./getSearchProfileViewPage";
import { getSearchPage } from "./getSearchViewPage";
import { getSearchWithTagFilterPage } from "./getSearchViewWithTagFilterPage";

export async function getSearchPages(
  content: IPage
): Promise<null | (IPage & IPageConfig)> {
  switch (content.id) {
    case "search":
      return getSearchPage(content);
    case "searchTagFilter":
      return getSearchWithTagFilterPage(content);
    case "searchProfile":
      return getSearchProfilePage(content);
    case "searchMidwife":
      return getSearchMidwifePage(content);
    case "searchMidwifeEntry":
      return getSearchMidwifeEntryPage(content);
    case "searchMidwifeWizard":
      return getSearchMidwifeWizardPage(content);
    case "SearchMidwifeConfirmation":
      return getSearchMidwifeConfirmationPage(content);
    case "searchMidwifeDone":
      return getSearchMidwifeDonePage(content);
    default:
      return null;
  }
}
