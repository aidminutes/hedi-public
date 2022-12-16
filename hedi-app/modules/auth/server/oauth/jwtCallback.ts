import { IsIHTTPError } from "@/modules/common/error";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { IUserAuth } from "../../types";
import { tryRefresh } from "./functions";
import { getExpires } from "./utils";

// https://next-auth.js.org/tutorials/refresh-token-rotation
// our case works a little differnt, since we are using credentials provider
// tokens are either available on user on first login
// or on token itself
export const jwt = async ({
  token,
  user,
  account,
}: {
  token: JWT | IUserAuth;
  user?: User | IUserAuth;
  account?: Record<string, any>;
}) => {
  // Initial sign in
  if (account?.type) {
    // account empty if call was not preceded by a login
    if (account.type === "credentials") {
      token = { ...token, ...user };
    } else {
      // in case of other providers, untested
      token = {
        ...token,
        ...account,
        ...getExpires(account.expires_in),
        ...user,
      };
    }
  }

  // returns token itself or tries refresh
  const refresh = await tryRefresh(token as IUserAuth);
  // we have to fight a bit against ts compiler here
  if (!IsIHTTPError(refresh)) return refresh;

  throw refresh;
};
