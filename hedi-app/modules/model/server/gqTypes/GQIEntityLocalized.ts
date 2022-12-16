import { GQString } from "@/modules/graphql/server/gq-ts";
import { IEntityLocalized } from "../../IEntityLocalized";
import { GQIEntity } from "./GQIEntity";

export const GQIEntityLocalized: IEntityLocalized = {
  ...GQIEntity,
  lang: GQString,
};
