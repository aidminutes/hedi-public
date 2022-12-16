import { IPage } from "@/modules/common/types";
import { IPageConfig } from "@/modules/shell/types";
import { ServiceSession } from "@/modules/auth/server/cache/ServiceSession";
import { IAuthHeader } from "@/modules/auth/types";
import { getMyOrganisationConnections } from "../query";
import { IProfileEditOrganisationsView } from "../../client/components";
import { getOrganisationEntryList } from "@/modules/profile/server/query/getOrganisationEntryList";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";

export const getProfileEditOrganisationsPage = async (
  content: IPage
): Promise<IProfileEditOrganisationsView & IPageConfig> => {
  content.type = "ProfileEditOrganisations";

  // TODO: this does not work at the moment, because we have no auth header at this stage
  const authHeader = await ServiceSession.getAuthHeader();
  const myConnections =
    (await getMyOrganisationConnections(authHeader as IAuthHeader)) ?? [];
  const organisations = (await getOrganisationEntryList(content.lang)) ?? [];

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "profile-edit-organisation",
  };

  const shell: IPageConfig = {
    redirectUnAuthorized: "/" + content.lang,
    revalidate: true,
    layout,
  };

  return {
    ...content,
    myConnections,
    organisations,
    ...shell,
  };
};
