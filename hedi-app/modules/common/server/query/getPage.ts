import { logAndNull } from "@/modules/common/error";
import { getLangByRoute } from "@/modules/common/utils";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";

import { IPage } from "../../types";
import { GQPage } from "../gqTypes/GQIPage";

const getPageQuery = gql`
    query getPage(
      $routes: [String!]!
      $lang: String!
    ) {
      ${withArgs({ pages: [GQPage] }, "pages", {
        routes: "$routes",
        lang: " $lang",
      })}
    }
  `;

export async function getPage(route: string): Promise<IPage | null> {
  const lang = getLangByRoute(route);

  const page = await serviceGQuery<{ pages: IPage[] }>(getPageQuery, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.pages?.[0] ?? null);

  return page;
}
