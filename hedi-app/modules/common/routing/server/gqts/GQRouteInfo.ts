import { gql, queryFields } from "@/modules/graphql/server/gq-ts";
import { withAlias, withArgs } from "@/modules/graphql/server/gq-ts/decorators";
import { gqPick } from "@/modules/graphql/server/gq-ts/utils/pick";
import { GQIEntityLocalized } from "@/modules/model/server/gqTypes/GQIEntityLocalized";
import { RouteInfo } from "../../types";

export const GQRouteInfo: RouteInfo = gqPick(GQIEntityLocalized, [
  "lang",
  "route",
]);

const GQRouteInfoByPageId = (lang: string) =>
  withAlias(
    withArgs(
      {
        [lang]: GQRouteInfo,
      },
      lang,
      { ids: "$pageId", lang }
    ),
    lang,
    "pagesById"
  );
export function GQGetRouteInfos(langs: string[]) {
  return `query getRouteInfosByPageId($pageId: [String!]!) {
    ${langs.map(l => queryFields(GQRouteInfoByPageId(l))).join(" ")}
  }`;
}
