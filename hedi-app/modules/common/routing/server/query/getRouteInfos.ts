import { serviceGQuery } from "@/modules/graphql";
import { logAndFallback } from "@/modules/common/error";
import { GQGetRouteInfos } from "../gqts/GQRouteInfo";
import { RouteInfo } from "../../types";

type RouteInfoResponse = Record<string, RouteInfo[]>;

export async function getRouteInfos(
  pageId: string,
  langs: string[]
): Promise<RouteInfo[]> {
  const records = await serviceGQuery<RouteInfoResponse>(
    GQGetRouteInfos(langs),
    {
      pageId: [pageId],
    }
  ).then(data => logAndFallback(data, {} as RouteInfoResponse));
  return Object.values(records).flat();
}
