import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IFullWidthLayout } from "@/modules/shell/client/components/Layout/types/IFullWidthLayout";
import { getImageInstance } from "@/modules/components";
import { getLayoutPosterImage } from "@/modules/shell/utils";

export const getFeedbackPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "Feedback";

  // const definition = await getFeedbackDefinition(content);

  const poster = getLayoutPosterImage(content.components);

  const layout: IFullWidthLayout = {
    kind: "FullWidth",
    id: "feedback-form",
    poster,
  };
  const shell: IPageConfig = {
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    // ...definition,
    ...shell,
  };
};
