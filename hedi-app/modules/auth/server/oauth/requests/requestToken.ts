import * as querystring from "querystring";
import { ITokenResponse } from "./types";
import { toCSRFObject } from "../utils";
import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";

export async function requestToken(
  username: string,
  password: string,
  csrfToken: string
) {
  const body = {
    grant_type: "password",
    username,
    password,
    scope: "profile email openid offline_access role",
    client_id: process.env.NEXTAUTH_CMS_ID,
    client_secret: process.env.NEXTAUTH_CMS_SECRET,
  };

  return fetch(process.env.CMS_URL + "/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...toCSRFObject(csrfToken),
    },
    body: querystring.stringify(body),
  }).then<ITokenResponse | IHTTPError>(response =>
    response.status === 200 ? response.json() : responseToIHTTPError(response)
  );
}
