import { IEntityTranslated } from "../../IEntityTranslated";
import { GQIEntityLocalized } from "./GQIEntityLocalized";
import { GQIWithType } from "./GQIWithType";

export const GQIEntityTranslated: IEntityTranslated = {
  ...GQIWithType,
  ...GQIEntityLocalized,
  translations: [GQIEntityLocalized],
};
