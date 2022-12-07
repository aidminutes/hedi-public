import { CategoryEntryList } from "../CategoryEntryList";
import { Seperator } from "@/modules/common/client/components";
import { Row, Column } from "carbon-components-react";
import { transformCategory } from "./transformCategory";
import { ArticleEntryList } from "@/modules/editorial/article/client";
import { useSubCategories } from "./useSubCategories";
import { ICategoryView } from "../../../types";

export const Category = ({
  content,
}: {
  content: ICategoryView;
}): JSX.Element => {
  const { articles, categories, articleEntryListHeadline } = transformCategory(
    content
  );
  const { hasSubCategories } = useSubCategories(categories);
  return (
    <>
      {categories ? <CategoryEntryList categories={categories} /> : null}

      {articles ? (
        <>
          <ArticleEntryList
            entryType={hasSubCategories ? "minimal" : "normal-neighbours"}
            articles={articles}
            headline={hasSubCategories ? articleEntryListHeadline : undefined}
          />
        </>
      ) : null}
    </>
  );
};
