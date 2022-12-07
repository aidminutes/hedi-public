import { logAndFallback } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";

import { GQPage } from "../gqTypes/GQIPage";
import { IPage } from "../../types";

type PageById = {
  pagesById: IPage[];
};

const gqPageById: PageById = {
  pagesById: [GQPage],
};

const getPageByIdQuery = gql`
query getPageById($lang: String!, $ids: [String!]!) {
  ${withArgs(gqPageById, "pagesById", { ids: "$ids", lang: "$lang" })}
}
`;

export async function getPageById(
  lang: string,
  pageId: string
): Promise<IPage> {
  const { pagesById } = await serviceGQuery<PageById>(getPageByIdQuery, {
    lang,
    ids: [pageId],
  }).then(data => logAndFallback(data, { pagesById: [] as IPage[] }));

  if (!pagesById || pagesById.length < 1) {
    throw new Error(`Error while fetching Page [${pageId}:$${lang}]`);
  }
  return pagesById[0];
}
