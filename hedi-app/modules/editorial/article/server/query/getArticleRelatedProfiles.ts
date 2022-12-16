import { serviceGQuery } from "@/modules/graphql";
import { logAndFallback } from "@/modules/common/error";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IArticleView } from "../../types";
import { GQBusinessProfile } from "@/modules/profile/server/gqTypes/GQBusinessProfile";

type RelatedProfiles = Pick<IArticleView, "relatedProfiles">;

interface IArticlesRelatedProfilesResponse {
  articles: RelatedProfiles[];
}

const gqIArticlesRelatedProfilesResponse: IArticlesRelatedProfilesResponse = {
  articles: [{ relatedProfiles: [GQBusinessProfile] }],
};

const getRelatedProfilesGQ = gql`
query getRelatedProfiles(
  $routes: [String!]!
  $lang: String!
) {
  ${withArgs(gqIArticlesRelatedProfilesResponse, "articles", {
    routes: "$routes",
    lang: "$lang",
  })}
  }
`;

export async function getArticleRelatedProfiles(
  route: string,
  lang: string
): Promise<RelatedProfiles> {
  const {
    articles: [relatedProfiles, ..._],
  } = await serviceGQuery<IArticlesRelatedProfilesResponse>(
    getRelatedProfilesGQ,
    {
      lang,
      routes: [route],
    }
  ).then(data =>
    logAndFallback(data, {
      articles: [{ relatedProfiles: [] }],
    } as IArticlesRelatedProfilesResponse)
  );
  return relatedProfiles;
}
