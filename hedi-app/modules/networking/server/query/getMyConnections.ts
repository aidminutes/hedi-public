import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql, withAlias, withArgs } from "@/modules/graphql/server/gq-ts";
import {
  GQConnection,
  GQMidwifeCareConnection,
  GQOrganisationConnection,
} from "../gqTypes";
import {
  Connection,
  IConnection,
  IMidwifeCareConnection,
  IOrganisationConnection,
} from "../../types";

type ConnectionType =
  | "OrganisationConnection"
  | "MidwifeCareConnection"
  | "Connection";

const gqTypeMap: Record<ConnectionType, IConnection> = {
  OrganisationConnection: GQOrganisationConnection,
  MidwifeCareConnection: GQMidwifeCareConnection,
  Connection: GQConnection,
};

export async function getMyConnections(
  authHeader: IAuthHeader,
  routes?: string[],
  lang?: string
) {
  return getMyIConnections<Connection>("Connection", authHeader, routes, lang);
}

export async function getMyOrganisationConnections(
  authHeader: IAuthHeader,
  routes?: string[],
  lang?: string
) {
  return getMyIConnections<IOrganisationConnection>(
    "OrganisationConnection",
    authHeader,
    routes,
    lang
  );
}

export async function getMyMidwifeCareConnections(
  authHeader: IAuthHeader,
  routes?: string[],
  lang?: string
) {
  return getMyIConnections<IMidwifeCareConnection>(
    "MidwifeCareConnection",
    authHeader,
    routes,
    lang
  );
}

function generateMyConnectionQuery(connectionType: ConnectionType) {
  const query = withArgs(
    withAlias(
      {
        myConnections: gqTypeMap[connectionType],
      },
      "myConnections",
      "my" + connectionType + "s"
    ),
    "myConnections",
    { routes: "$routes", lang: "$lang" }
  );
  return gql`query myConnections ($routes: [String!], $lang: String) {
      ${query}
    }`;
}

async function getMyIConnections<T extends IConnection>(
  connectionType: ConnectionType,
  authHeader: IAuthHeader,
  routes?: string[],
  lang?: string
): Promise<T[] | null> {
  const { myConnections } = await userGQuery<{ myConnections: T[] }>(
    authHeader,
    generateMyConnectionQuery(connectionType),
    {
      routes: routes || null,
      lang: lang || null,
    }
  ).then(data => logAndFallback(data, { myConnections: [] as T[] }));

  return myConnections;
}
