import { IArticle, IArticleView } from "../../types";
import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { StylesCache } from "@/modules/media/server/cache/StylesCache";
import { imageToImageComponent } from "@/modules/components";
import { getArticleDefinition } from "../query/getArticleDefinition";
import { getArticleRelatedProfiles } from "../query/getArticleRelatedProfiles";
import { DefinitionCache } from "@/modules/common/server/cache/DefinitionCache";
import { removeHTMLTags } from "@/modules/common/utils/removeHTMLTags";

export const getArticlePage = async (
  content: IArticle
): Promise<IArticleView & IPageConfig> => {
  const { route, lang } = content;

  const definitionFetcher = getArticleDefinition(lang);
  const [definition, profiles] = await Promise.all([
    DefinitionCache.get("articleDefinition", content.lang, definitionFetcher),
    getArticleRelatedProfiles(route, lang),
  ]);
  const articleDefinition = { ...definition, ...profiles };

  const meta: IMetaInfo = {
    indexing: true,
    description: removeHTMLTags(content.summary),
  };
  const posterImage =
    StylesCache.swap(imageToImageComponent(content.category.image), "header") ??
    null;

  return {
    ...content,
    ...articleDefinition,
    posterImage,
    meta,
  };
};
