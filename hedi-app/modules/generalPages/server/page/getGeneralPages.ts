import { IPage } from "@/modules/common/types/IPage";
import { IPageConfig } from "@/modules/shell/types";
import { getAboutPage } from "../../about/server/page/getAboutPage";
import { getContactPage } from "../../contact/server/pages/getContactPage";
import { getFaq } from "../../faq/server/page/getFaq";

export async function getGeneralPages(
  content: IPage
): Promise<null | (IPage & IPageConfig)> {
  switch (content.id) {
    case "about":
      return getAboutPage(content);
    case "contact":
      return getContactPage(content);
    case "faq":
      return getFaq(content);
    default:
      return null;
  }
}
