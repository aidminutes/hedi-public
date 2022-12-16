import { IWithType } from "@/modules/model";
import React from "react";
import { Article } from "../../article/client/components/Article/Article";
import { IArticleView } from "../../article/types";
import { Category } from "../../category/client";
import { ICategoryView } from "../../category/types";
import { Glossary } from "../../glossary/client/components";
import { IGlossaryViewDefinition } from "../../glossary/types";
import { TopicsView } from "../../topics/client/components/TopicsView/TopicsView";
import { ITopicsView } from "../../topics/types";

export const TryEditorial = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  switch (content.type) {
    case "Glossary":
      return (
        <Glossary props={content as IGlossaryViewDefinition} key="glossary" />
      );
    case "Topics":
      return <TopicsView {...(content as ITopicsView)} key="categoryroot" />;
    case "Category":
      return <Category content={content as ICategoryView} key="category" />;
    case "Article":
      return <Article content={content as IArticleView} key="article" />;
    default:
      return null;
  }
};
