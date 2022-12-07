import { ServerCache } from "../../../server/ServerCache";
import { IRouteTransformSet } from "../../types";
import { IRouteCache } from "./types";

export namespace RouteCache {
  function getCache(id: string): IRouteCache {
    const rawCache = ServerCache.get("routeCache." + id);
    if (rawCache.data === null || rawCache.lastUpdatedTS === 0) {
      rawCache.data = {};
    }
    return rawCache as IRouteCache;
  }

  export function isInitialized(id: string) {
    return getCache(id).initialized;
  }

  export function initialize(id: string, data: IRouteTransformSet) {
    const updated = update(id, data);
    if (updated) {
      const cache = getCache(id);
      cache.initialized = true;
    }
    return updated;
  }

  export function update(id: string, data: IRouteTransformSet) {
    if (data) {
      const cache = getCache(id);
      for (let key in data) {
        cache.data[key] = data[key];
      }
      cache.lastUpdatedTS = new Date().getTime();
      return true;
    }
    return false;
  }

  export function get(id: string) {
    const c = getCache(id);
    return c.data;
  }
}
