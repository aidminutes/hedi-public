import { requestToken } from "../requests";
import { IsIHTTPError } from "@/modules/common/error";
import { tokenResponseToAuth } from "../utils";

export async function getAccess(
  username: string,
  password: string,
  csrfToken: string
) {
  const response = await requestToken(username, password, csrfToken);
  if (IsIHTTPError(response)) return response;

  return tokenResponseToAuth(response, csrfToken);
}
