import React from "react";
import { ITopicsView } from "../../../types";
import { transformTopicsView } from "./transformTopicsView";
import { Column, Grid, Row } from "carbon-components-react";
import { Label, Body } from "@/modules/components";
import { MainCategoryCardList } from "../MainCategoryCardList";
import {
  ArticleEntryList,
  CuratedArticleList,
} from "@/modules/editorial/article/client/components/";
import {
  WaveTop,
  WaveBottom,
} from "@/modules/editorial/topics/client/components/TopicsView/Waves";
import { ArticleSearchSection } from "@/modules/editorial/topics/client/components/TopicsView/ArticleSearchSection";
export const TopicsView = (props: ITopicsView) => {
  const { categories, articles, curatedArticles } = props;
  const {
    headline,
    text,
    allArticlesHeadline,
    searchPlaceholder,
    searchImage,
    searchHeadline,
    searchButton,
    curatedArticlesHeadline,
  } = transformTopicsView(props);
  return (
    <section className="hedi--topics-view">
      <Grid>
        {headline && (
          <Row>
            <Column md={{ span: 4 }}>
              <Label {...headline} className="hedi--topics-view__headline" />
            </Column>
          </Row>
        )}
        {text && (
          <Row className="hedi--topics-view__intro-text">
            <Column md={{ span: 4 }}>
              <Body {...text} />
            </Column>
          </Row>
        )}
        {categories && <MainCategoryCardList categories={categories} />}
      </Grid>

      {curatedArticles && (
        <div className="hedi--topics-view__recommended-articles">
          <div className="hedi--topics-view__recommended-articles--top">
            <WaveTop />
          </div>
          <div className="hedi--topics-view__recommended-articles--content">
            <Grid narrow>
              <CuratedArticleList
                articles={curatedArticles ?? []}
                headline={curatedArticlesHeadline}
              />
            </Grid>
          </div>
          <div className="hedi--topics-view__recommended-articles--bottom">
            <WaveBottom />
          </div>
        </div>
      )}
      <Grid>
        <ArticleSearchSection
          placeholderText={searchPlaceholder}
          headline={searchHeadline}
          button={searchButton}
          image={searchImage}
        />

        {articles && (
          <ArticleEntryList
            headline={allArticlesHeadline || "Headline"}
            articles={articles}
            entryType="minimal"
          />
        )}
      </Grid>
    </section>
  );
};
