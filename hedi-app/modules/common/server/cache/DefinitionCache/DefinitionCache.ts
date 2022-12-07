import { ExecutionMode } from "../../ExecutionMode";
import { IServerCache, ServerCache } from "../../ServerCache";

interface IDefinition<T> extends IServerCache {
  data: T;
}

export namespace DefinitionCache {
  const baseId = "definition";

  function getCache<T>(id: string, lang: string) {
    return ServerCache.get([baseId, id, lang].join(".")) as IDefinition<T>;
  }

  function isInitialized(id: string, lang: string) {
    return getCache(id, lang).initialized;
  }

  export function update<T>(id: string, lang: string, data: T) {
    const cache = getCache<T>(id, lang);
    cache.data = data;
    cache.initialized = true;
    cache.lastUpdatedTS = new Date().getTime();
    return true;
  }

  export async function get<T>(
    id: string,
    lang: string,
    fetcher: Promise<T>,
    interval: number = 10
  ) {
    if (!isInitialized(id, lang) || ExecutionMode() === "development") {
      const initial = await fetcher;
      update(id, lang, initial);
      return initial;
    } else {
      if (ExecutionMode() === "regeneration") {
        const ts = new Date().getTime();
        const diff = ts - getCache(id, lang).lastUpdatedTS;
        if (diff > interval * 1000) {
          const data = await fetcher;
          update(id, lang, data);
        }
      }
      return getCache<T>(id, lang).data;
    }
  }
}
