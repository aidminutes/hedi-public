import { logAndNull } from "@/modules/common/error";
import { getLangByRoute } from "@/modules/common/utils";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIArticleContent } from "../gqTypes/GQIArticleContent";
import { IArticleContent } from "../../types/IArticleContent";

type ArticleContentResponse = {
  articles: IArticleContent[];
};

const articleContentResponseGQ: ArticleContentResponse = withArgs(
  {
    articles: [GQIArticleContent],
  },
  "articles",
  { routes: "$routes", lang: "$lang" }
);

const getArticleContentQuery = gql`
  query getArticleContent(
    $routes: [String!]!
    $lang: String!
    $hrefLang: String
  ) { 
    ${articleContentResponseGQ} 
  }
`;

export async function getArticleContent(
  route: string,
  hrefLang?: string
): Promise<IArticleContent | null> {
  const lang = getLangByRoute(route);

  return serviceGQuery<ArticleContentResponse>(getArticleContentQuery, {
    routes: [route],
    lang,
    hrefLang,
  }).then(data => logAndNull(data)?.articles[0] ?? null);
}
