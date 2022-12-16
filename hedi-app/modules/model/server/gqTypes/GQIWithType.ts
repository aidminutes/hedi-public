import { GQString, withAlias } from "@/modules/graphql/server/gq-ts";
import { IWithType } from "../../IWithType";

export const GQIWithType: IWithType = withAlias(
  { type: GQString },
  "type",
  "__typename"
);
