import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { IGroupComponent, isLink } from "@/modules/components";
import { getTopics } from "../query/getTopics";
import { findCuratedArticlesInstance } from "@/modules/components/types/ICuratedArticlesComponent";
import { IBlankLayout } from "@/modules/shell/client/components/Layout/types/IBlankLayout";
import { ITopics } from "../../types/ITopics";

export type TopicsPage = IPage & ITopics;

export const getTopicsPage = async (
  content: IPage
): Promise<TopicsPage & IPageConfig> => {
  content.type = "Topics";
  const { components } = content;
  const curatedArticles = findCuratedArticlesInstance(
    components,
    "recommendations"
  );

  const layout: IBlankLayout = {
    kind: "Blank",
  };
  const meta: IMetaInfo = { indexing: true };
  const data = await getTopics(
    content.lang,
    curatedArticles?.articleRoutes ?? []
  );
  const shell: IPageConfig = {
    layout,
  };

  return {
    ...data,
    ...content,
    ...shell,
    meta,
  };
};

export function getLinksFromGroup(group: IGroupComponent): string[] {
  const { components } = group;
  if (!components || components.length === 0) return [];
  return components.filter(isLink).map(element => element.href);
}
