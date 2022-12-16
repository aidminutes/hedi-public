import { serviceGQuery } from "@/modules/graphql";
import { IEntityLocalized } from "@/modules/model";
import { routeToSegments } from "../../utils";
import { ISegmentPath } from "../../types";
import { logAndNull } from "../../error";
import { GQType } from "@/modules/graphql/server/gq-ts/types";
import { gql } from "@/modules/graphql/server/gq-ts";

export async function getSegmentsPaths(
  gqTypes: GQType[],
  lang: string
): Promise<ISegmentPath[]> {
  const getSegmentsPathsGQ = gql`
  query getSegmentsPaths($lang: String) {
    ${gqTypes}
  }`;

  return serviceGQuery<Record<string, IEntityLocalized[]>>(getSegmentsPathsGQ, {
    lang,
  }).then(data =>
    !logAndNull(data)
      ? []
      : Object.values(data).flatMap(ets =>
          (Array.isArray(ets) ? ets : [ets])
            .filter(e => e.lang === lang)
            .map(e => ({
              params: { segments: routeToSegments(e.route) },
              locale: e.lang,
            }))
        )
  );
}
