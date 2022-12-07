import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { getConversationViewDefinition } from "../../client/components/ConversationView/getConversationViewDefinition";
import { IConversationView } from "../../client/components/ConversationView/types";
import { IBlankLayout } from "@/modules/shell/client/components/Layout/types/IBlankLayout";

export const getConversationPage = async (
  content: IPage
): Promise<IConversationView & IPageConfig & Pick<IPage, "components">> => {
  // TODO IPage.components not actually needed as return, fix typing in getPagePage

  content.type = "MSG.Conversation";

  const layout: IBlankLayout = {
    kind: "Blank",
    id: "conversation",
  };

  const shell: IPageConfig = {
    hideScrollToTop: true,
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  const { components, ...pageContent } = content;
  const definition = getConversationViewDefinition(components);

  return {
    ...pageContent,
    ...definition,
    ...shell,
    components,
  };
};
