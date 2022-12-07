import { tokenResponseToAuth } from "../utils";
import { requestRefresh } from "../requests";
import { IAuth } from "../../../types";
import { IsIHTTPError } from "@/modules/common/error";

export async function tryRefresh<T extends IAuth>(auth: T) {
  if (Date.now() < auth.accessTokenExpires - 500) return auth;

  const { refreshToken, csrfToken } = auth;
  const response = await requestRefresh(refreshToken, csrfToken);
  if (IsIHTTPError(response)) return response;

  return {
    ...auth,
    ...tokenResponseToAuth(response, csrfToken),
  } as T;
}
