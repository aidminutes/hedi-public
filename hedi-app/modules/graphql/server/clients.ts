import { join } from "path";
import { GraphQLClient } from "graphql-request";
import { AssertServerSide } from "@/modules/common/utils";

enum GQLEndpoint {
  Public = "public",
  User = "user",
  Internal = "internal",
}

const buildGQLURL = (endpoint = GQLEndpoint.Public) => {
  if (AssertServerSide()) {
    if (!process.env.GQL_URL) throw new Error("FATAL: no server url specified");

    const clientURL = new URL(process.env.GQL_URL);
    clientURL.pathname = join(clientURL.pathname, endpoint);
    return clientURL;
  } else {
    return new URL("https://projekt-hedi.de");
  }
};

export const publicClient = new GraphQLClient(buildGQLURL().href);

export const userClient = new GraphQLClient(buildGQLURL(GQLEndpoint.User).href);

export const internalClient = new GraphQLClient(
  buildGQLURL(GQLEndpoint.Internal).href
);
