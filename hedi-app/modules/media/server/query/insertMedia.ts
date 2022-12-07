import { IAuthHeader } from "@/modules/auth/types";
import { logAndNull } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql } from "@/modules/graphql/server/gq-ts";
import { GQInsertMedia } from "../gqTypes/GQInsertMedia";
import { IMediaInput, IMediaMutationResult } from "../../types";

export const insertMediaMutationGQ = gql`
mutation insertMedia($input: [MediaInput!]!, $lang: String) {
  ${GQInsertMedia}
}
`;

export async function insertMedia(
  authHeader: IAuthHeader,
  media: IMediaInput[],
  lang?: string
): Promise<IMediaMutationResult[] | null> {
  return userGQuery<{ insertMedia: IMediaMutationResult[] }>(
    authHeader,
    insertMediaMutationGQ,
    {
      input: media,
      lang,
    }
  ).then(data => logAndNull(data)?.insertMedia ?? null);
}
