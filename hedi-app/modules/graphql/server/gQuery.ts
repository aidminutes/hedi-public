import { IAuthHeader } from "@/modules/auth/types";
import { ServiceSession } from "@/modules/auth/server/cache/ServiceSession";
import { GraphQLClient } from "graphql-request";
import {
  Variables,
  RequestDocument,
  ClientError,
} from "graphql-request/dist/types";
import { IGQLError } from "./types";
import { internalClient, publicClient, userClient } from "./clients";

export const publicGQuery = async <T>(
  headers: IAuthHeader,
  document: RequestDocument,
  variables?: Variables
) => gQuery<T>(publicClient, headers, document, variables);

export const userGQuery = async <T>(
  headers: IAuthHeader,
  document: RequestDocument,
  variables?: Variables
) => gQuery<T>(userClient, headers, document, variables);

export const serviceGQuery = async <T>(
  document: RequestDocument,
  variables?: Variables,
  client = internalClient
) => {
  try {
    const auth = await ServiceSession.getAuthHeader();
    return gQuery<T>(client, auth, document, variables);
  } catch (e: any) {
    return {
      status: 500,
      errors: [{ service: e }],
    } as IGQLError;
  }
};

async function gQuery<T>(
  client: GraphQLClient,
  headers: IAuthHeader,
  document: RequestDocument,
  variables?: Variables
) {
  return client
    .setHeaders(headers)
    .request<T>(document, variables)
    .catch<IGQLError>((e: ClientError) =>
      e.response.status === 200 // means query (string) had errors
        ? {
            status: 400,
            errors: e.response.errors,
          }
        : {
            status: e.response.status,
            errors: [{ message: e.response.message }],
          }
    );
}
