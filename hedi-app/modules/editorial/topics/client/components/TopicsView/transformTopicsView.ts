import {
  findBodyInstance,
  findLabelInstance,
  getLabelInstance,
} from "@/modules/components";
import { findCuratedArticlesInstance } from "@/modules/components/types/ICuratedArticlesComponent";
import { ITopicsView } from "@/modules/editorial/topics/types";
import { getArticleSearchSectionDefinition } from "./ArticleSearchSection";

export function transformTopicsView(props: ITopicsView) {
  const { components } = props;
  // TODO needs cleanup with definition and config
  const headline = getLabelInstance(components, "headline", {
    labelKind: "h2",
    text: "Topics to start with",
  });
  const text = findBodyInstance(components, "introText");
  const articleEntryListHeadline = findLabelInstance(components, "allArticles");
  const curatedArticlesComponent = findCuratedArticlesInstance(
    components,
    "recommendations"
  );
  const {
    searchHeadline,
    searchInput,
    searchButton,
    searchImage,
  } = getArticleSearchSectionDefinition(components);

  return {
    headline,
    text,
    allArticlesHeadline: articleEntryListHeadline?.text,
    searchPlaceholder: searchInput?.placeholder,
    searchHeadline: searchHeadline.text,
    searchImage: searchImage,
    searchButton: searchButton,
    curatedArticlesHeadline: curatedArticlesComponent?.text,
  };
}
