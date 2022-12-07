import { GQScalar } from "@/modules/graphql/server/gq-ts";
import { ImageStyle, IWithImageStyles } from "../../types";

export const GQIWithImageStyles: IWithImageStyles = {
  imageStyles: GQScalar<ImageStyle>(),
};
