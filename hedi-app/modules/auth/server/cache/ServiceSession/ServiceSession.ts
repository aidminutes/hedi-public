import { IServerCache, ServerCache } from "@/modules/common/server/ServerCache";
import { IAuth, isIAuth } from "../../../types";
import { tryRefresh } from "../../oauth/functions/tryRefresh";
import { authorizeService } from "../../oauth/authorizeService";
import { toAuthHeader } from "../../oauth";

interface IServiceAuthCache extends IServerCache {
  data: IAuth | null;
}

export namespace ServiceSession {
  function getCache() {
    return ServerCache.get("serviceauth") as IServiceAuthCache;
  }

  function get() {
    return getCache().data;
  }

  function set(token: IAuth | null) {
    getCache().data = token;
  }

  export async function getAuthToken() {
    const cachedAuth = get();
    if (!!cachedAuth) {
      const refreshedAuth = await tryRefresh(cachedAuth);
      if (cachedAuth !== refreshedAuth) {
        set(isIAuth(refreshedAuth) ? refreshedAuth : null);
      }
    }
    // no auth token yet or refresh failed
    // attempt new login
    if (!get()) {
      if (!process.env.SERVICE_USER || !process.env.SERVICE_SECRET)
        throw new Error("FATAL: no service configured");

      const username = process.env.SERVICE_USER;
      const password = process.env.SERVICE_SECRET;

      const newAuth = await authorizeService(username, password);
      set(isIAuth(newAuth) ? newAuth : null);
    }

    return get();
  }

  export async function getAuthHeader() {
    const token = await getAuthToken().catch(e => {
      console.error(e);
      return null;
    });
    if (!token) throw new Error("FATAL: service could not authorize");
    else return toAuthHeader(token);
  }
}
