import { IsIHTTPError } from "@/modules/common/error";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeWithCredentials } from "../oauth";

interface ICredentials extends Record<"password" | "username", string> {
  csrfToken?: string;
}

// TODO: [auth] login language specific

export const credentialProvider = CredentialsProvider({
  name: "HEDI App",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "hedi" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials: ICredentials | undefined, _) => {
    if (!credentials) return null;
    //input type is not typed correctly
    const { username, password, csrfToken } = credentials;

    if (username && password && csrfToken) {
      const response = await authorizeWithCredentials(
        username,
        password,
        csrfToken
      );
      if (IsIHTTPError(response)) {
        // Error or custom uri (as pure string) can be passed here
        return null;
      } else {
        return response;
      }
    } else return null;
  },
});
