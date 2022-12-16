import { IPage } from "@/modules/common/types";
import { IUserPanelLayout } from "@/modules/shell/client/components/Layout/types/IUserPanelLayout";
import { IPageConfig } from "@/modules/shell/types";
import { getRoomsViewDefinition } from "../../client/components/DevOnly/RoomsView/getRoomsViewDefinition";
import { IRoomsView } from "../../client/components/DevOnly/RoomsView/types";

export const getRoomsPage = async (
  content: IPage
): Promise<IRoomsView & IPageConfig & Pick<IPage, "components">> => {
  // TODO IPage.components not actually needed as return, fix typing in getPagePage

  content.type = "MSG.Rooms";

  const layout: IUserPanelLayout = {
    kind: "UserPanel",
    id: "conversation",
  };

  const shell: IPageConfig = {
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  const { components, ...pageContent } = content;
  const definition = getRoomsViewDefinition(components);
  return {
    ...pageContent,
    ...definition,
    components,
    ...shell,
  };
};
