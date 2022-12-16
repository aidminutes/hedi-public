import { GQArticleEntry } from "../../../article/server/gqTypes/GQIArticleEntry";
import { GQRecommendedArticle } from "../../../article/server/gqTypes/GQIArticle";
import {
  gql,
  gqPick,
  withAlias,
  withArgs,
} from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server";
import { GQICategory } from "./GQICategory";
import { GQICategoryEntry } from "./GQICategoryEntry";

const GQGetCategories = withArgs({ categories: GQICategory }, "categories", {
  routes: "$routes",
  lang: "$lang",
});

export const getCategoriesGQ = gql`
  query getCategories(
    $routes: [String!]!
    $lang: String
  ) {
    ${GQGetCategories}
  }
`;

const GQArticles = withArgs({ articles: GQArticleEntry }, "articles", {
  lang: "$lang",
});
const GQCategories = withArgs(
  {
    categories: {
      ...GQICategoryEntry,
      ...gqPick(GQICategory, ["parent", "appStyle"]),
    },
  },
  "categories",
  { lang: "$lang" }
);
const GQRecommendedArticles = withAlias(
  withArgs({ articles: GQRecommendedArticle }, "articles", {
    lang: "$lang",
    routes: "$routes",
  }),
  "recommendedArticles",
  "articles"
);

export const getTopicsGQ = gql`
  query getTopics($lang: String!,$routes: [String!]) {
    ${GQArticles}
    ${GQCategories}
    ${GQRecommendedArticles}
  }
`;
