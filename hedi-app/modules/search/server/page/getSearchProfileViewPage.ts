import { findLabelInstance } from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { ITitleOutsideLayout } from "@/modules/shell/client/components/Layout/types/ITitleOutsideLayout";
import { IPageConfig } from "@/modules/shell/types";
import { getLayoutPosterImage } from "@/modules/shell/utils";

export const getSearchProfilePage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "SearchProfile";
  const { components } = content;

  const mainHeadline = findLabelInstance(components, "mainHeadline");

  const poster = getLayoutPosterImage(content.components);

  const layout: ITitleOutsideLayout = {
    kind: "TitleOutside",
    headline: mainHeadline?.text ?? content.label,
    id: "profile-search",
    poster,
  };

  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
