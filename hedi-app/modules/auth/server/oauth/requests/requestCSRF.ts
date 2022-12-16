import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";

export async function requestCSRF() {
  return fetch(process.env.CMS_URL + "/session/token", {
    method: "GET",
  }).then<string | IHTTPError>(response =>
    response.status === 200 ? response.text() : responseToIHTTPError(response)
  );
}
