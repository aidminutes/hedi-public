import { logAndFallback } from "@/modules/common/error";
import { StylesCache } from "@/modules/media/server/cache";
import { serviceGQuery } from "@/modules/graphql";
import {
  gql,
  gqPick,
  withAlias,
  withArgs,
} from "@/modules/graphql/server/gq-ts";
import { GQCategory } from "../../../category/server/gqTypes/GQICategory";
import { GQCuratedArticleEntry } from "../../../article/server/gqTypes/GQCuratedArticleEntry";
import { GQArticleEntry } from "../../../article/server/gqTypes/GQIArticleEntry";
import { ITopics } from "../../types/ITopics";
import { GQICategoryEntry } from "@/modules/editorial/category/server/gqTypes/GQICategoryEntry";

let gqITopics: ITopics = {
  categories: [
    { ...GQICategoryEntry, ...gqPick(GQCategory, ["parent", "appStyle"]) },
  ],
  articles: [GQArticleEntry],
  curatedArticles: [GQCuratedArticleEntry],
};

gqITopics = withArgs(gqITopics, "categories", { lang: "$lang" });
gqITopics = withArgs(gqITopics, "articles", { lang: "$lang" });
gqITopics = withAlias(
  withArgs(gqITopics, "curatedArticles", {
    lang: "$lang",
    routes: "$routes",
  }),
  "curatedArticles",
  "articles"
);

const getTopicsGQ = gql`
query getTopics($lang: String!,$routes: [String!]) {
    ${gqITopics}
  }
`;

export async function getTopics(
  lang: string,
  routes: string[]
): Promise<ITopics> {
  const {
    categories,
    articles,
    curatedArticles,
  } = await serviceGQuery<ITopics>(getTopicsGQ, {
    lang,
    routes,
  }).then(data =>
    logAndFallback(data, {
      categories: [],
      articles: [],
      curatedArticles: [],
    } as ITopics)
  );

  curatedArticles.forEach(article =>
    StylesCache.swap(article.category.image, "square")
  );

  const rootCategories = categories.filter(category => category.parent === 0);

  const transformedRootCategoriesWithNewStyle = StylesCache.swapInEntities(
    rootCategories,
    "topic"
  );

  return {
    categories: transformedRootCategoriesWithNewStyle,
    articles,
    curatedArticles,
  };
}
