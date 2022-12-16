import { IPage } from "@/modules/common/types/IPage";
import { IPageConfig } from "@/modules/shell/types";
import { getGlossaryPage } from "../../glossary/server/page/getGlossaryPage";
import { getTopicsPage } from "../../topics/server/page/getTopicsPage";

export async function getEditorialPages(
  content: IPage
): Promise<null | (IPage & IPageConfig)> {
  switch (content.id) {
    case "glossary":
      return getGlossaryPage(content);
    case "topics":
      return getTopicsPage(content);
    default:
      return null;
  }
}
