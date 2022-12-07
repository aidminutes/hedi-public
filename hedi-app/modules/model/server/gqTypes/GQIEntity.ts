import { GQString } from "@/modules/graphql/server/gq-ts";
import { IEntity } from "../../IEntity";
import { GQIWithType } from "./GQIWithType";

export const GQIEntity: IEntity = {
  ...GQIWithType,
  route: GQString,
  label: GQString,
};
