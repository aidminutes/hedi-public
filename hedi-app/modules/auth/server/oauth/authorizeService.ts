import { IsIHTTPError } from "@/modules/common/error";
import { requestCSRF } from "./requests";
import { getAccess } from "./functions";

export async function authorizeService(username: string, password: string) {
  const csrfResponse = await requestCSRF();
  if (IsIHTTPError(csrfResponse)) return csrfResponse;

  return getAccess(username, password, csrfResponse);
}
