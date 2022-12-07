import { ITag, IWithTags } from "../../IWithTags";
import { GQIEntityTranslated } from "./GQIEntityTranslated";

export const GQITag: ITag = { ...GQIEntityTranslated } as ITag; //NOTE hard casting due to circular reference in translations

export const GQIWithTags: IWithTags = {
  tags: [GQITag],
};
