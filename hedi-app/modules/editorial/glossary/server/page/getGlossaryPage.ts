import { IPage } from "@/modules/common/types";
import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { getGlossaryContent } from "../query";
import { glossaryTermsToGlossaryKeyGroup } from "../query/functions";
import { IGlossaryKeyGroup } from "../../types";
import { ITitleOutsideLayout } from "@/modules/shell/client/components/Layout/types/ITitleOutsideLayout";
import { getImageInstance, isLabel } from "@/modules/components/types";
import {
  getLayoutPosterImage,
  getLayoutPageHeadline,
} from "@/modules/shell/utils";

export type IGlossaryPage = IPage & {
  glossaryKeyGroups: IGlossaryKeyGroup[];
};

export async function getGlossaryPage(
  content: IPage
): Promise<IGlossaryPage & IPageConfig> {
  const lang = content.lang;
  const glossaryEntityWithTerms = await getGlossaryContent(lang);
  const glossaryKeyGroups = await glossaryTermsToGlossaryKeyGroup(
    glossaryEntityWithTerms
  );

  content.type = "Glossary";

  const meta: IMetaInfo = { indexing: true };
  const poster = getLayoutPosterImage(content.components);
  const headline = content.components
    .filter(isLabel)
    .find(item => item.labelKind === "h1" && item.id === "headline");

  if (headline)
    content.components.splice(content.components.indexOf(headline), 1);
  const layout: ITitleOutsideLayout = {
    kind: "TitleOutside",
    poster,
    headline: headline?.text ?? content.label,
  };
  const shell: IPageConfig = {
    layout,
  };

  return {
    ...content,
    glossaryKeyGroups: glossaryKeyGroups,
    ...shell,
    meta,
  };
}
