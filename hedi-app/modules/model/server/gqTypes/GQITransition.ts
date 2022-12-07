import { GQString } from "@/modules/graphql/server/gq-ts";
import { ITransition } from "../../ITransition";
import { GQIEntity } from "./GQIEntity";
import { GQIWithType } from "./GQIWithType";

export const GQITransition: ITransition = {
  ...GQIWithType,
  ...GQIEntity,
  kind: GQString,
  longLabel: GQString,
  body: GQString,
};
