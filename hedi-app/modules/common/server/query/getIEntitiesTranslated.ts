import { serviceGQuery } from "@/modules/graphql";
import { gql } from "@/modules/graphql/server/gq-ts";
import { GQType } from "@/modules/graphql/server/gq-ts/types";
import { getLangByRoute } from "../../utils";
import { IsIHTTPError, logAndFallback } from "../../error";
import { isIPage, PageVisibility } from "../../types";

export async function getIEntitiesTranslated<T>(
  gqTypes: GQType[],
  routes: string[],
  lang?: string,
  dstLang?: string
): Promise<T[]> {
  lang =
    lang ??
    getLangByRoute((routes || []).find(x => /^\/[a-z]{2}\/.+/i.test(x)) || "");

  const query = gql`
    query getEntitiesTranslated(
      $routes: [String!]!
      $lang: String!
      $dstLang: String
    ) {
      entitiesTranslated(routes: $routes, lang: $lang, dstLang: $dstLang) {
        ${gqTypes}
      }
    }
  `;
  return serviceGQuery<{ entitiesTranslated: T[] }>(query, {
    routes,
    lang,
    dstLang,
  }).then(data => {
    let result = data;
    if (!IsIHTTPError(result) && result.entitiesTranslated) {
      result.entitiesTranslated = result.entitiesTranslated.filter(
        entity =>
          !(isIPage(entity) && entity.visibility == PageVisibility.Internal)
      );
    }
    return logAndFallback(result, { entitiesTranslated: Array<T>() })
      ?.entitiesTranslated;
  });
}
