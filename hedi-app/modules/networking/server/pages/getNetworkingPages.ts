import { IPage } from "@/modules/common/types/IPage";
import { IPageConfig } from "@/modules/shell/types";
import { getMidwifeCareConnectionsPage } from "./getMidwifeCareConnectionsPage";
import { getMidwifeCareRequestPage } from "./getMidwifeCareRequestPage";
import { getMidwifeCaresPage } from "./getMidwifeCaresPage";
import { getProfileEditOrganisationsPage } from "./getEditOrganisationsPage";
import { getProfileEditOwnedOrganisationPage } from "./getProfileEditOwnedOrganisationPage";
import { getMyMidwifeCaresPage } from "./getMyMidwifeCaresPage";
import { getMidwifeCareDetailsPage } from "./getMidwifeCareDetailsPage";
import { getMidwifeFinishedCaresPage } from "./getMidwifeFinishedCaresPage";
import { getMidwifeNetworkRequestPage } from "./getMidwifeNetworkRequestPage";
import { getMidwifeCareConnectionsArchivePage } from "./getMidwifeCareConnectionsArchivePage";

export async function getNetworkingPages(
  content: IPage
): Promise<null | (IPage & IPageConfig)> {
  switch (content.id) {
    case "finishedCares":
      return getMidwifeFinishedCaresPage(content);
    case "midwifeCares":
      return getMidwifeCaresPage(content);
    case "midwifeCareConnections":
      return getMidwifeCareConnectionsPage(content);
    case "midwifeCareConnectionsArchive":
      return getMidwifeCareConnectionsArchivePage(content);
    case "midwifeCareRequest":
      return getMidwifeCareRequestPage(content);
    case "profileEditOrganisations":
      return getProfileEditOrganisationsPage(content);
    case "profileEditOwnedOrganisation":
      return getProfileEditOwnedOrganisationPage(content);
    case "myMidwifeCares":
      return getMyMidwifeCaresPage(content);
    case "midwifeCareDetails":
      return getMidwifeCareDetailsPage(content);
    case "networkRequest":
      return getMidwifeNetworkRequestPage(content);
    default:
      return null;
  }
}
