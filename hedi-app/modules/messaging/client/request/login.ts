import { IAPIResponse } from "@/modules/model";
import { MatrixClient } from "matrix-js-sdk";
import { loginTokenAPIUrl } from "../../types";

export async function login(msgClient: MatrixClient) {
  // TODO handle login failure gracefully
  const fetchTokenResponse = await fetch(loginTokenAPIUrl);
  if (fetchTokenResponse.status === 200) {
    const loginTokenResponse =
      (await fetchTokenResponse.json()) as IAPIResponse<string>;
    if (loginTokenResponse.success && loginTokenResponse.data) {
      const reLogin = await msgClient.loginWithToken(loginTokenResponse.data);
      return reLogin;
    }
  }

  return null;
}
