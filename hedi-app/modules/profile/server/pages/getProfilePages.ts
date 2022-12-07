import { IPage } from "@/modules/common/types/IPage";
import { IPageConfig } from "@/modules/shell/types";
import { getPregnancyPage } from "./getPregnancyPage";
import { getProfileEditImagePage } from "./getProfileEditImagePage";
import { getProfileEditPage } from "./getProfileEditPage";
import { getProfilePreviewPage } from "./getProfilePreviewPage";
import { getProfileUserCardPage } from "./getProfileUserCardPage";
import { getServicesPage } from "./getServicesPage";
import { getCapacityPage } from "./getCapacityPage";
import { getPregnantUserCardPage } from "./getPregnantUserCardPage";

export async function getProfilePages(
  content: IPage
): Promise<null | (IPage & IPageConfig)> {
  switch (content.id) {
    case "pregnancy":
      return getPregnancyPage(content);
    case "PregnantUserCard":
      return getPregnantUserCardPage(content);
    case "profileEdit":
      return getProfileEditPage(content);
    case "profileImage":
      return getProfileEditImagePage(content);
    case "profilePreview":
      return getProfilePreviewPage(content);
    case "profileUserCard":
      return getProfileUserCardPage(content);
    case "profileServices":
      return getServicesPage(content);
    case "ProfileCapacity":
      return getCapacityPage(content);
    default:
      return null;
  }
}
