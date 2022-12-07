import { IUserInfoResponse } from "../../../types";
import { toAuthHeader } from "../utils";
import { IHTTPError } from "@/modules/common/error";

export async function requestUserInfo(accessToken: string, csrfToken: string) {
  const response = await fetch(process.env.CMS_URL + "/oauth2/UserInfo", {
    method: "GET",
    headers: toAuthHeader({ accessToken, csrfToken }),
  });
  if (response.status === 200)
    return response.json() as Promise<IUserInfoResponse>;
  else
    return {
      status: response.status,
      message: response.statusText,
    } as IHTTPError;
}
