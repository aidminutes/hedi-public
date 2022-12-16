import { IPage } from "@/modules/common/types/IPage";
import { IPageConfig } from "@/modules/shell/types";
import { getSysMessageDetailPage } from "./getSysMessageDetailPage";
import { getSysMessagesPage } from "./getSysMessagesPage";

export async function getSysMessagePages(
  content: IPage
): Promise<null | (IPage & IPageConfig)> {
  switch (content.id) {
    case "sysMessageDetail":
      return getSysMessageDetailPage(content);
    case "sysMessages":
      return getSysMessagesPage(content);
    default:
      return null;
  }
}
