import { IServerCache } from "./types";

export namespace ServerCache {
  //@ts-ignore
  globalThis["serverCache"] = globalThis["serverCache"] ?? {};

  //@ts-expect-error
  const records = globalThis["serverCache"] as Record<string, IServerCache>;

  export function get(key: string): IServerCache {
    if (!records[key]) {
      records[key] = {
        initialized: false,
        lastUpdatedTS: 0,
        data: null,
      };
    }
    return records[key];
  }
}
