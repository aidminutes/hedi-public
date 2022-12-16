import { NextApiResponse, NextApiRequest } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { credentialProvider } from "../providers";
import { jwt } from "../oauth/jwtCallback";
import { session } from "../oauth/sessionCallback";

function getOptions(debug?: boolean): NextAuthOptions {
  return {
    debug,
    providers: [credentialProvider],
    session: { strategy: "jwt" },
    jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    callbacks: {
      jwt,
      session,
    },
    secret: process.env.NEXTAUTH_JWT_SECRET, // TODO choose proper salt
  };
}

export const nextauthAPI = async (
  req: NextApiRequest,
  res: NextApiResponse,
  debug = true
) => {
  return NextAuth(req, res, getOptions(debug));
};
