import { logAndNull } from "@/modules/common/error";
import { gql } from "@/modules/graphql/server/gq-ts";
import { serviceGQuery } from "@/modules/graphql";
import { GQIWithImageStyles } from "../gqTypes/GQIWithImageStyles";
import { ImageStyle, IWithImageStyles } from "../../types";

const getImageStylesQuery = gql`
query getImageStyles {
  ${GQIWithImageStyles}
}
`;

export async function getImageStyles(): Promise<ImageStyle> {
  return await serviceGQuery<IWithImageStyles>(getImageStylesQuery).then(
    data => logAndNull(data)?.imageStyles || {}
  );
}
