import React from "react";
import { Row, Column } from "carbon-components-react";
import { Entry } from "@/modules/common/client/components";

import { generateArticleEntryListColumnProps } from "./generateArticleEntryListColumnProps";
import { IArticleEntryListProps } from "../../../types";

export const ArticleEntryList = (props: IArticleEntryListProps) => {
  const { articles, headline, entryType } = props;
  const { columnProps } = generateArticleEntryListColumnProps(props);

  return (
    <div className="hedi--article-entry-list">
      {headline && (
        <Row>
          <Column>
            {/* TODO headline type from cms */}
            <h2 className="hedi--article-entry-list__headline">{headline}</h2>
          </Column>
        </Row>
      )}
      {entryType === "normal-neighbours" ? (
        <Row narrow>
          {articles.map((article, index) => (
            <Column {...columnProps} key={article.label + index}>
              <Entry entryType={entryType} {...article} />
            </Column>
          ))}
        </Row>
      ) : (
        <>
          {articles.map((article, index) => (
            <Row narrow key={article.label + index}>
              <Column {...columnProps}>
                <Entry entryType={entryType} {...article} />
              </Column>
            </Row>
          ))}
        </>
      )}{" "}
    </div>
  );
};
