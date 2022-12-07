import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { isErrorThatCanBeHandled } from "@/modules/common/utils";
import { gql, withAlias, withArgs } from "@/modules/graphql/server/gq-ts";
import {
  InsertConnectionInput,
  ITransitionConnectionResponse,
  ITransitionMidwifeCareConnectionResponse,
  ITransitionOrganisationConnectionResponse,
} from "../../types";
import {
  GQTransitionMidwifeCareConnectionResponse,
  GQTransitionOrganisationConnectionResponse,
} from "../gqTypes";

type ConnectionType = "OrganisationConnection" | "MidwifeCareConnection";

const gqTypeMap: Record<ConnectionType, ITransitionConnectionResponse> = {
  OrganisationConnection: GQTransitionOrganisationConnectionResponse,
  MidwifeCareConnection: GQTransitionMidwifeCareConnectionResponse,
};

export async function insertOrganisationConnectionMutation(
  input: {
    input: InsertConnectionInput;
    lang?: string;
  },
  authHeader: IAuthHeader
) {
  return insertConnectionMutation<ITransitionOrganisationConnectionResponse>(
    input,
    authHeader,
    generateConnectionMutation("OrganisationConnection")
  );
}

export async function insertMidwifeCareConnectionMutation(
  input: {
    input: InsertConnectionInput;
    lang?: string;
  },
  authHeader: IAuthHeader
) {
  return insertConnectionMutation<ITransitionMidwifeCareConnectionResponse>(
    input,
    authHeader,
    generateConnectionMutation("MidwifeCareConnection")
  );
}

function generateConnectionMutation(connectionType: ConnectionType) {
  const mutation = withArgs(
    withAlias(
      {
        insertConnection: gqTypeMap[connectionType],
      },
      "insertConnection",
      "insert" + connectionType
    ),
    "insertConnection",
    {
      input: "$input",
      lang: "$lang",
    }
  );
  return gql`mutation insertConnection(
    $input: InsertConnectionInput
    $lang: String
  ) {
    ${mutation}
  }`;
}

async function insertConnectionMutation<
  T extends ITransitionConnectionResponse
>(
  input: {
    input: InsertConnectionInput;
    lang?: string;
  },
  authHeader: IAuthHeader,
  insertConnectionMutation: string
): Promise<T | IHTTPError> {
  return userGQuery<{
    insertConnection: T;
  }>(authHeader, insertConnectionMutation, input).then(data => {
    if (isErrorThatCanBeHandled(data)) return data;
    if (
      Array.isArray(data.insertConnection?.errors) &&
      !data.insertConnection.errors.length
    ) {
      data.insertConnection.errors = undefined;
    }
    return data.insertConnection;
  });
}
