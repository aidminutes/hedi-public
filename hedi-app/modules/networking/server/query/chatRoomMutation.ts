import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { ICareConnectionRoomResponse } from "../../types";
import { GQCareConnectionRoomResponse } from "../gqTypes";

export const getMidwifeCareConnectionRoomIdGQ = gql`
mutation getMidwifeCareConnectionRoomId(
  $route: String! 
  ) {
    ${withArgs(
      { getMidwifeCareConnectionRoomId: GQCareConnectionRoomResponse },
      "getMidwifeCareConnectionRoomId",
      { route: "$route" }
    )}
}`;

export async function chatRoomMutation(
  input: {
    route: string;
  },
  authHeader: IAuthHeader
): Promise<ICareConnectionRoomResponse | IHTTPError> {
  return userGQuery<{
    getMidwifeCareConnectionRoomId: ICareConnectionRoomResponse;
  }>(authHeader, getMidwifeCareConnectionRoomIdGQ, input).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.getMidwifeCareConnectionRoomId?.errors) &&
      !data.getMidwifeCareConnectionRoomId.errors.length
    ) {
      data.getMidwifeCareConnectionRoomId.errors = undefined;
    }
    return data.getMidwifeCareConnectionRoomId;
  });
}
