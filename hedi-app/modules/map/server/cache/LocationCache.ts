import { IServerCache, ServerCache } from "@/modules/common/server/ServerCache";
import { Location } from "../../types";

interface ILocationCache extends IServerCache {
  data: Record<string, Location | null>;
}

export namespace LocationCache {
  function getCache(): ILocationCache {
    const rawCache = ServerCache.get("locationCache");
    if (rawCache.data === null || rawCache.lastUpdatedTS === 0) {
      rawCache.data = {};
      rawCache.initialized = true;
      rawCache.lastUpdatedTS = new Date().getTime();
    }
    return rawCache as ILocationCache;
  }

  export function has(key: string) {
    return !!getCache().data[key];
  }

  export function get(key: string) {
    return getCache().data[key];
  }

  export function set(key: string, location: Location | null) {
    getCache().data[key] = location;
  }

  export async function getOrFetch(
    key: string,
    fetcher: Promise<Location | null>,
    alternativeFetcher: null | Promise<Location | null>
  ) {
    if (has(key)) {
      return get(key);
    } else if (key.trim() !== "") {
      const errCatcher = () => {
        console.log("error by location fetch: " + key);
        return null;
      };
      let location = await fetcher.catch(errCatcher);
      if (!location?.latLong && alternativeFetcher !== null) {
        location = await alternativeFetcher.catch(errCatcher);
      }
      set(key, location);
      return location;
    }
    return null;
  }
}
