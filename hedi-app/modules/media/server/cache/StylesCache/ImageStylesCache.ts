import { ExecutionMode } from "@/modules/common/server/ExecutionMode";
import { IServerCache, ServerCache } from "@/modules/common/server/ServerCache";
import { getImageStyles } from "../../query/getImageStyles";
import { ImageStyle } from "../../../types";

interface IImageStylesCache extends IServerCache {
  data: ImageStyle;
}

export namespace ImageStylesCache {
  const id = "imageStyles";

  function getCache(): IImageStylesCache {
    const rawCache = ServerCache.get(id);
    if (rawCache.data === null || rawCache.lastUpdatedTS === 0) {
      rawCache.data = {};
    }
    return rawCache as IImageStylesCache;
  }

  export function isInitialized() {
    return getCache().initialized;
  }

  export async function initialize() {
    let updated = false;
    if (!isInitialized()) {
      updated = await update();
      if (updated) {
        const cache = getCache();
        cache.initialized = true;
      }
    }
    return updated;
  }

  export async function update() {
    const data = await getImageStyles().catch(e => {
      console.error("failed to fetch image styles: ", e);
    });
    if (data) {
      const cache = getCache();
      cache.data = data;
      cache.initialized = true;
      cache.lastUpdatedTS = new Date().getTime();
      return true;
    }
    return false;
  }

  export async function assertValid(interval: number = 10) {
    await initialize();
    if (ExecutionMode() !== "build") {
      const ts = new Date().getTime();
      const diff = ts - getCache().lastUpdatedTS;
      if (diff > interval * 1000) {
        await update();
      }
    }
    return isInitialized();
  }

  export function get() {
    return getCache().data;
  }
}
