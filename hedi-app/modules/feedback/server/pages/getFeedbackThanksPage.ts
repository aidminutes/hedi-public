import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";

export const getFeedbackThanksPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "FeedbackThanks";

  const shell: IPageConfig = {
    redirectUnAuthorized: "/" + content.lang,
  };

  return {
    ...content,
    ...shell,
  };
};
