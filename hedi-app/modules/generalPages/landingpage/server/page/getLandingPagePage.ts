import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import {
  getLandingPageViewDefinition,
  ILandingPageView,
} from "@/modules/generalPages/landingpage/client/components";
import { getPageById } from "@/modules/common/server";

import { transformFaqPage } from "@/modules/generalPages/faq/client/components/Faq/transformFaqPage";
import { IBlankLayout } from "@/modules/shell/client/components/Layout/types/IBlankLayout";

export const getLandingPagePage = async (
  content: IPage
): Promise<ILandingPageView & IPageConfig> => {
  content.type = "LandingPage";

  const layout: IBlankLayout = {
    kind: "Blank",
  };
  const meta: IMetaInfo = { indexing: true };
  const shell: IPageConfig = {
    layout: layout,
  };

  const componentDefinitions = getLandingPageViewDefinition(content.components);
  content.components = []; // TODO: check client bundle size

  // TODO: This is a quick and dirty way to get the first 3 questions of the FAQ
  //       A dedicated way to get them would be better.
  const faqPage = await getPageById(content.lang, "faq");
  const { questions } = transformFaqPage(faqPage.components);
  const faqTeaserQuestions = questions.slice(0, 3);

  return {
    ...content,
    ...shell,
    componentDefinitions,
    faqTeaserQuestions,
    revalidate: true,
    meta,
  };
};
