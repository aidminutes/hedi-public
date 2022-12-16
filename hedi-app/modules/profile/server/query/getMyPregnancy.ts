import { logAndFallback } from "@/modules/common/error";
import { IAuthHeader } from "@/modules/auth/types";
import { userGQuery } from "@/modules/graphql";
import { gql } from "@/modules/graphql/server/gq-ts";
import { IPregnancy } from "../../types";
import { GQPregnancy } from "../gqTypes/GQPregnancy";

type MyPregnancyResponse = { myPregnancy: IPregnancy | null };

const gqMyPregnancyResponse: MyPregnancyResponse = {
  myPregnancy: GQPregnancy,
};

export const getMyPregnancyGQ = gql`
  query getMyPregnancy {
    ${gqMyPregnancyResponse}
  }
`;

export async function getMyPregnancy(
  authHeader: IAuthHeader
): Promise<IPregnancy | null> {
  const { myPregnancy } = await userGQuery<MyPregnancyResponse>(
    authHeader,
    getMyPregnancyGQ
  ).then(data =>
    logAndFallback(data, { myPregnancy: null } as MyPregnancyResponse)
  );

  return myPregnancy;
}
