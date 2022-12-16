import { IAuth } from "../../../types";
import { ITokenResponse } from "../requests/types";

const getIAT = (now: number) => Math.floor(now / 1000);

const getAccessTokenExpires = (now: number, expiresIn: number) =>
  now + expiresIn * 1000;

export const getExpires = (expiresIn: number) => {
  const now = Date.now();
  const iat = getIAT(now);
  const accessTokenExpires = getAccessTokenExpires(now, expiresIn);
  return {
    accessTokenExpires,
    expires: expiresIn,
    iat,
    exp: 0,
  };
};

export const tokenResponseToAuth = (
  tokenResponse: ITokenResponse,
  csrfToken: string
): IAuth => ({
  accessToken: tokenResponse.access_token,
  ...getExpires(tokenResponse.expires_in),
  refreshToken: tokenResponse.refresh_token,
  csrfToken,
});
