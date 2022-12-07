import { findLabelInstance } from "@/modules/components";
import { ICategoryView } from "@/modules/editorial/category/types";

export function transformCategory(content: ICategoryView) {
  const { categories, articles, label, image, appStyle, components } = content;
  const articleEntryListHeadline = findLabelInstance(components, "articles");

  return {
    categories: categories?.length > 0 ? categories : null,
    articles: articles?.length > 0 ? articles : null,
    headline: label,
    image,
    appStyle,
    articleEntryListHeadline: articleEntryListHeadline?.text,
  };
}
