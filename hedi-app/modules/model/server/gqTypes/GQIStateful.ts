import { GQString } from "@/modules/graphql/server/gq-ts";
import { IStateful } from "../../IStateful";
import { GQIState } from "./GQIState";
import { GQITransition } from "./GQITransition";
import { GQIWithType } from "./GQIWithType";

export const GQIStateful: IStateful = {
  ...GQIWithType,
  route: GQString,
  state: GQIState,
  transitions: [GQITransition],
};
