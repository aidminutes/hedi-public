import { RoutesCache } from "@/modules/common/routing/server/RouteCache";
import { IRouteTransformSet } from "@/modules/common/routing/types";

export namespace SearchRoutesCache {
  const ids = ["search", "searchProfile", "searchTagFilter"];

  export async function initialize(locales: string[]) {
    return RoutesCache.initialize(ids, locales);
  }

  export function getRouteTransformFunctions(): (() => IRouteTransformSet)[] {
    return RoutesCache.get(ids);
  }
}
