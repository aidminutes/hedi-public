import { logAndNull } from "@/modules/common/error";
import { getLangByRoute } from "@/modules/common/utils";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIArticle } from "../gqTypes/GQIArticle";
import { IArticle } from "../../types";

type ArticlesResponse = {
  articles: IArticle[];
};

const articlesResponseGQ: ArticlesResponse = {
  articles: [GQIArticle],
};

const getArticleQuery = gql`
  query getArticles(
    $routes: [String!]!
    $lang: String!
  ) { 
    ${withArgs(articlesResponseGQ, "articles", {
      routes: "$routes",
      lang: "$lang",
    })} 
  }
`;

export async function getArticle(route: string): Promise<IArticle | null> {
  const lang = getLangByRoute(route);

  return serviceGQuery<ArticlesResponse>(getArticleQuery, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.articles[0] ?? null);
}
