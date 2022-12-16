import React from "react";
import { Column, Row } from "carbon-components-react";
import { CuratedArticle } from "./CuratedArticle";
import { ICuratedArticleListProps } from "../../../types/ICuratedArticleEntry";

export const CuratedArticleList: React.FC<ICuratedArticleListProps> = ({
  articles,
  headline,
}) => {
  return (
    <>
      {headline && (
        <Row>
          <Column>
            <h2 className="hedi--curated-article-list__headline">{headline}</h2>
          </Column>
        </Row>
      )}
      <Row>
        <Column>
          <div className="hedi--curated-article-list__underline" />
        </Column>
      </Row>
      <Row>
        <Column lg={2} md={1} sm={0} />
        {articles.map((article, index) => (
          <>
            <Column lg={4} md={3} sm={4} key={article.label + index}>
              <CuratedArticle article={article} />
            </Column>
            {index % 2 === 1 && (
              <>
                <Column lg={0} md={1} sm={0} />
                <Column lg={0} md={1} sm={0} />
              </>
            )}
          </>
        ))}
      </Row>
    </>
  );
};
