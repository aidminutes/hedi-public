import { IImageComponent } from "@/modules/components";

export interface IAuth {
  accessToken: string;
  accessTokenExpires: number;
  expires: number;
  iat: number;
  exp: number;
  refreshToken: string;
  csrfToken: string;
}

export function isIAuth(obj: any): obj is IAuth {
  return (
    obj &&
    typeof obj.accessToken === "string" &&
    typeof obj.accessTokenExpires === "number" &&
    typeof obj.refreshToken === "string" &&
    typeof obj.csrfToken === "string"
  );
}

export interface IUserAuth extends IAuth, IUserInfo {}

export interface IAuthHeader extends Record<string, string> {
  Authorization: string;
  "X-CSRF-Token": string;
}

export interface IUserInfo extends Record<string, unknown> {
  name: string;
  preferred_username?: string;
  givenname?: string;
  familyname?: string;
  route?: string;
  pictureComponent?: IImageComponent;
  email: string;
  role?: string;
  profession?: string;
  sub?: string;
  uuid?: string;
}

export interface IUserInfoResponse extends IUserInfo {
  sub: string;
}
