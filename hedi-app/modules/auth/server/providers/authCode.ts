import { IUserInfoResponse } from "../../types";

export const authCodeProvider = {
  id: "hediauthcode",
  name: "HEDI",
  type: "oauth",
  version: "2.0",
  scope: "profile email openid offline_access role",
  params: { grant_type: "authorization_code" },
  accessTokenUrl: process.env.CMS_URL + "/oauth2/token",
  authorizationUrl:
    process.env.CMS_URL + "/oauth2/authorize?response_type=code",
  profileUrl: process.env.CMS_URL + "/oauth2/UserInfo",
  profile: (userInfoRes: IUserInfoResponse) => {
    const { sub, ...userInfo } = userInfoRes;
    return userInfo;
  },
  clientId: process.env.NEXTAUTH_CMS_ID,
  clientSecret: process.env.NEXTAUTH_CMS_SECRET,
};
