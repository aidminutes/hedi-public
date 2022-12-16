import { IPage } from "@/modules/common/types";
import { logAndFallback } from "@/modules/common/error";
import { GQIPage } from "@/modules/common/server/gqTypes/GQIPage";
import { serviceGQuery } from "@/modules/graphql";
import { gql, gqPick, withArgs } from "@/modules/graphql/server/gq-ts";
import { IArticleViewDefinition } from "../../types";
import { getArticleViewDefinition } from "../../client/components/Article/getArticleViewDefinition";

type ArticleDefinitionResponse = {
  pagesById: Pick<IPage, "components">[];
};

export const articleDefinitionResponseGQ: ArticleDefinitionResponse = {
  pagesById: [gqPick(GQIPage, ["components"])],
};

export const getArticleDefinitionQuery = gql`
  query getArticleDefinition(
    $lang: String!
  ) { 
    ${withArgs(articleDefinitionResponseGQ, "pagesById", {
      ids: ["articleDefinition", "common.profile"],
      lang: "$lang",
    })} 
  }
`;

export async function getArticleDefinition(
  lang: string
): Promise<IArticleViewDefinition> {
  const {
    pagesById: [articleDefinition, commonProfile],
  } = await serviceGQuery<ArticleDefinitionResponse>(
    getArticleDefinitionQuery,
    {
      lang,
    }
  ).then(data =>
    logAndFallback(data, {
      pagesById: [],
    } as ArticleDefinitionResponse)
  );

  if (!articleDefinition)
    throw new Error("Error while fetching Article Page data");

  const components = commonProfile
    ? articleDefinition.components.concat(...commonProfile.components)
    : articleDefinition.components;

  return getArticleViewDefinition(components);
}
