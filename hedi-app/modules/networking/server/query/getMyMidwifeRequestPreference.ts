import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql } from "@/modules/graphql/server/gq-ts";
import { IMidwifeRequestPreference } from "../../types";
import { GQMidwifeRequestPreference } from "../gqTypes";

type MyMidwifeRequestPreferenceResponse = {
  myMidwifeRequestPreference: IMidwifeRequestPreference | null;
};

const getMyMidwifeRequestPreferenceGQ = gql`
query getMyMidwifeRequestPreference {
  myMidwifeRequestPreference {
    ${GQMidwifeRequestPreference}
  }
}
`;

export async function getMyMidwifeRequestPreference(
  authHeader: IAuthHeader
): Promise<IMidwifeRequestPreference | null> {
  const {
    myMidwifeRequestPreference,
  } = await userGQuery<MyMidwifeRequestPreferenceResponse>(
    authHeader,
    getMyMidwifeRequestPreferenceGQ
  ).then(data =>
    logAndFallback(data, {
      myMidwifeRequestPreference: null,
    } as MyMidwifeRequestPreferenceResponse)
  );

  return myMidwifeRequestPreference;
}
