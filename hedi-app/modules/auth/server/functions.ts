import { NextApiRequest } from "next";
import { getToken, decode, encode } from "next-auth/jwt";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuthHeader, IUserAuth, IUserInfo } from "../types";
import { toAuthHeader } from "./oauth";

const getUserAuth = async (
  req: NextApiRequest
): Promise<IUserAuth | IHTTPError | null> => {
  if (!process.env.NEXTAUTH_JWT_SECRET)
    throw new Error("FATAL: nextauth misconfigured");
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  return getToken({ req, secret, decode }).catch<IHTTPError>(e => e) as Promise<
    IUserAuth | IHTTPError | null
  >;
};

export const getUserAuthHeader = async (
  req: NextApiRequest
): Promise<IAuthHeader | null> => {
  const auth = await getUserAuth(req);
  if (!auth) return auth;
  if (IsIHTTPError(auth)) {
    console.error(auth);
    return null;
  }
  return toAuthHeader(auth);
};

export const getUserInfo = async (
  req: NextApiRequest
): Promise<IUserInfo | null> => {
  const auth = await getUserAuth(req);
  if (!auth) return null;
  if (IsIHTTPError(auth)) {
    console.error(auth);
    return null;
  }
  const {
    name,
    email,
    route,
    preferred_username,
    picture,
    role,
    profession,
  } = auth;
  return { name, email, route, preferred_username, picture, role, profession };
};
