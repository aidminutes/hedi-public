import { btoa } from "./btoa";

export function basicAuth(username?: string, password?: string) {
  if (!!username && !!password)
    return "Basic " + btoa(username + ":" + password);
  else throw new Error("[BasicAuth]: missing credential input");
}
