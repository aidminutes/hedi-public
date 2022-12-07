import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQSysMessage } from "../gqTypes/GQISysMessage";
import { ISysMessage } from "../../types";

type MySysMessagesResponse = {
  mySysMessages: ISysMessage[];
};

const mySysMessagesGQ: MySysMessagesResponse = withArgs(
  { mySysMessages: [GQSysMessage] },
  "mySysMessages",
  {
    lang: "$lang",
    onlyUndelivered: "$onlyUndelivered",
  }
);

const mySysMessagesQuery = gql`
query getMySysMessages (
  $lang: String!
  $onlyUndelivered: Boolean
) {
  ${mySysMessagesGQ}
}
`;

export async function getMySysMessages(
  authHeader: IAuthHeader,
  lang: string,
  onlyUndelivered: boolean
): Promise<ISysMessage[] | null> {
  const { mySysMessages } = await userGQuery<MySysMessagesResponse>(
    authHeader,
    mySysMessagesQuery,
    { lang, onlyUndelivered }
  ).then(data => logAndFallback(data, { mySysMessages: [] as ISysMessage[] }));

  return mySysMessages;
}
