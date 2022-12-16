import { ExecutionMode } from "@/modules/common/server/ExecutionMode";
import { getRouteInfos } from "../query/getRouteInfos";
import { IRouteTransformSet } from "../../types";
import { RouteCache } from "./RouteCache";

export namespace RoutesCache {
  const updateFn = async (id: string, locales: string[]) => {
    const infos = await getRouteInfos(id, locales);
    let set: IRouteTransformSet = {};

    for (const { lang, route } of infos) {
      if (!Array.isArray(set[lang])) {
        set[lang] = [];
      }
      set[lang].push({
        target: route,
        startsWith: route,
      });
    }
    return set;
  };

  export async function initialize(ids: string[], locales: string[]) {
    return Promise.all(
      ids.map(async id => {
        // NOTE during build there should not be any dynamic routes (=route/extraparams) -> early exit
        if (ExecutionMode() === "build") return RouteCache.isInitialized(id);

        // NOTE if already initialized don't update
        // TODO periodicly re-initialize to catch path changes
        if (RouteCache.isInitialized(id)) return true;

        const data = await updateFn(id, locales);
        return RouteCache.initialize(id, data);
      })
    );
  }

  export function get(ids: string[]) {
    return ids.map(id => () => RouteCache.get(id));
  }
}
